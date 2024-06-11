import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { TokenSchema } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/emblems')
@UseGuards(AuthGuard('jwt'))
export class EmblemsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const emblems = await this.prisma.emblem.findMany();

    return emblems;
  }

  @Get('/user')
  async handleUserEmblems(@CurrentUser() user: TokenSchema) {
    const userEmblems = await this.prisma.user.findUnique({
      where: { id: user.sub },
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
