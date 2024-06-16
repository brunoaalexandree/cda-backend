import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@/auth/current-user-decorator';
import { TokenSchema } from '@/auth/jwt.strategy';
import { PrismaService } from '@/prisma/prisma.service';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { UserDto, UserEmblemsDto } from '@/dtos/user.dto';

@Controller('/user')
@UseGuards(AuthGuard('jwt'))
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
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
  @ApiOperation({ summary: 'Get user emblems' })
  @ApiResponse({
    status: 200,
    description: 'List of user emblems',
    type: UserEmblemsDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async handleUserEmblems(@CurrentUser() user: TokenSchema) {
    const userEmblems = await this.prisma.user.findUnique({
      where: { id: user.sub },
      include: { emblems: { include: { emblem: true } } },
    });

    return userEmblems?.emblems;
  }
}
