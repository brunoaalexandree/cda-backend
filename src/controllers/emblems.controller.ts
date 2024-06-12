import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '@/prisma/prisma.service';

@Controller('/emblems')
@UseGuards(AuthGuard('jwt'))
export class EmblemsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const emblems = await this.prisma.emblem.findMany();

    return emblems;
  }
}
