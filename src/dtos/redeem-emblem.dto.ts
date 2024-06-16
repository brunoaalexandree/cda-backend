import { ApiProperty } from '@nestjs/swagger';

export class RedeemEmblemDto {
  @ApiProperty({ description: 'UUID of the emblem to be redeemed' })
  emblemId!: string;
}
