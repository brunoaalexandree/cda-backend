import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '@/prisma/prisma.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmblemDto } from '@/dtos/emblems.dto';

@Controller('/emblems')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Emblems')
@ApiBearerAuth()
export class EmblemsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of emblems',
    type: [EmblemDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async handle() {
    const emblems = await this.prisma.emblem.findMany();

    return emblems;
  }
}
