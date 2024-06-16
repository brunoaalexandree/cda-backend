import { ApiProperty } from '@nestjs/swagger';

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
