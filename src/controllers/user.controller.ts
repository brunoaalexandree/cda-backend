import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenSchema } from '@/auth/jwt.strategy';
import { PrismaService } from '@/prisma/prisma.service';

@Controller('/user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@CurrentUser() currentUser: TokenSchema) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: currentUser.sub,
      },
    });

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    };
  }

  @Get('/emblems')
  async handleUserEmblems(@CurrentUser() user: TokenSchema) {
    const userEmblems = await this.prisma.user.findUnique({
      where: { id: user.sub },
      include: { emblems: { include: { emblem: true } } },
    });

    return userEmblems?.emblems;
  }
}
