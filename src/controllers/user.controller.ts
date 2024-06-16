import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  UseGuards,
} from '@nestjs/common';
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
import { UpdateProfileDto, UserDto, UserEmblemsDto } from '@/dtos/user.dto';
import { hash } from 'bcryptjs';

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

  @Patch()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile updated',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateProfile(
    @CurrentUser() currentUser: TokenSchema,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const { name, email, password } = updateProfileDto;

    const user = await this.prisma.user.findUnique({
      where: { id: currentUser.sub },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user with the new values
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: name ?? undefined,
        email: email ?? undefined,
        password: password ? await hash(password, 8) : undefined,
      },
    });

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }
}
