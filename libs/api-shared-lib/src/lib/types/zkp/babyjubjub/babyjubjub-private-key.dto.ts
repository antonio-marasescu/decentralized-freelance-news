import { BabyjubjubParameterDto, IBabyjubjubParameterDto } from './babyjubjub-parameter.dto';
import { ApiProperty } from '@nestjs/swagger';

export interface IBabyjubjubPrivateKeyDto {
  s: IBabyjubjubParameterDto;
}

export class BabyjubjubPrivateKeyDto implements IBabyjubjubPrivateKeyDto {
  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  s: BabyjubjubParameterDto;

  constructor(values: Partial<IBabyjubjubPrivateKeyDto>) {
    if (values) {
      this.s = new BabyjubjubParameterDto(values.s);
    }
  }
}
