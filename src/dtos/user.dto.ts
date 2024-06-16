import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'The unique identifier of the user' })
  id!: string;

  @ApiProperty({ description: 'The name of the user' })
  name!: string;

  @ApiProperty({ description: 'The email address of the user' })
  email!: string;
}

class EmblemDetails {
  @ApiProperty({ description: 'The unique identifier of the emblem' })
  id!: string;

  @ApiProperty({ description: 'The name of the emblem' })
  name!: string;

  @ApiProperty({ description: 'The image URL of the emblem' })
  imageUrl!: string;
}

export class UserEmblemsDto {
  @ApiProperty({ type: [EmblemDetails] })
  emblems!: EmblemDetails[];
}

export class UpdateProfileDto extends PartialType(UserDto) {
  @ApiProperty({ description: 'The new name of the user', required: false })
  name?: string;

  @ApiProperty({
    description: 'The new email address of the user',
    required: false,
  })
  email?: string;

  @ApiProperty({ description: 'The new password of the user', required: false })
  password?: string;
}
