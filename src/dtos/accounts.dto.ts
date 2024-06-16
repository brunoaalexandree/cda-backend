import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ description: 'The name of the user' })
  name!: string;

  @ApiProperty({ description: 'The email address of the user' })
  email!: string;

  @ApiProperty({ description: 'The password of the user' })
  password!: string;
}
