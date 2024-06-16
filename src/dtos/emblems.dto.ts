import { ApiProperty } from '@nestjs/swagger';

export class EmblemDto {
  @ApiProperty({ description: 'The unique identifier of the emblem' })
  id!: number;

  @ApiProperty({ description: 'The name of the emblem' })
  name!: string;

  @ApiProperty({ description: 'The image URL of the emblem' })
  imageUrl!: string;
}
