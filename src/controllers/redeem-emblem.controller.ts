import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenSchema } from '@/auth/jwt.strategy';
import { ZodValidationPipe } from '@/pipes/zod-validation';
import { PrismaService } from '@/prisma/prisma.service';
import { z } from 'zod';

const redeemEmblemBodySchema = z.object({
  emblemId: z.string().uuid(),
});

const bodyValidationPipe = new ZodValidationPipe(redeemEmblemBodySchema);

type RedeemEmblemBodySchema = z.infer<typeof redeemEmblemBodySchema>;

@Controller('/redeem-emblem')
@UseGuards(AuthGuard('jwt'))
export class RedeemEmblemController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: RedeemEmblemBodySchema,
    @CurrentUser() currentUser: TokenSchema,
  ) {
    const { sub } = currentUser;

    const user = await this.prisma.user.findUnique({
      where: {
        id: sub,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const emblem = await this.prisma.emblem.findUnique({
      where: {
        id: body.emblemId,
      },
    });

    if (!emblem) {
      throw new NotFoundException('Emblem not found');
    }

    const existingEmblem = await this.prisma.userEmblem.findUnique({
      where: {
        userId_emblemId: {
          userId: sub,
          emblemId: body.emblemId,
        },
      },
    });

    if (existingEmblem) {
      throw new ConflictException('User already has this emblem');
    }

    await this.prisma.userEmblem.create({
      data: {
        userId: sub,
        emblemId: body.emblemId,
      },
    });

    const userEmblems = await this.prisma.user.findUnique({
      where: { id: sub },
      include: { emblems: { include: { emblem: true } } },
    });

    return {
      id: userEmblems?.id,
      name: userEmblems?.name,
      email: userEmblems?.email,
      emblems: userEmblems?.emblems,
    };
  }
}
