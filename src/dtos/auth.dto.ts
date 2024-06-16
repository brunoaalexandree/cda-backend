import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateDto {
  @ApiProperty({ description: 'The email address of the user' })
  email!: string;

  @ApiProperty({ description: 'The password of the user' })
  password!: string;
}
