import { ApiProperty } from '@nestjs/swagger';

class EmblemDetails {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  imageUrl!: string;
}

class UserEmblems {
  @ApiProperty()
  emblem!: EmblemDetails;
}

export class UserEmblemsDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ type: [UserEmblems] })
  emblems!: UserEmblems[];
}
