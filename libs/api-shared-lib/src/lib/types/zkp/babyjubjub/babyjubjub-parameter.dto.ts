import { ApiProperty } from '@nestjs/swagger';

export interface IBabyjubjubParameterDto {
  n: string;
  modulus: string;
}

export class BabyjubjubParameterDto implements IBabyjubjubParameterDto {
  @ApiProperty({ required: true })
  n: string;

  @ApiProperty({ required: true })
  modulus: string;

  constructor(values: Partial<IBabyjubjubParameterDto>) {
    if (values) {
      this.n = values.n;
      this.modulus = values.modulus;
    }
  }
}
