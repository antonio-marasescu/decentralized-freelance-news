import {
  BabyjubjubPublicKeyParameterDto,
  IBabyjubjubPublicKeyParameterDto,
} from './babyjubjub-public-key-parameter.dto';
import { ApiProperty } from '@nestjs/swagger';

export interface IBabyjubjubPublicKeyDto {
  p: IBabyjubjubPublicKeyParameterDto;
}

export class BabyjubjubPublicKeyDto implements IBabyjubjubPublicKeyDto {
  @ApiProperty({ required: true, type: BabyjubjubPublicKeyParameterDto })
  p: BabyjubjubPublicKeyParameterDto;

  constructor(values: Partial<IBabyjubjubPublicKeyDto>) {
    if (values) {
      this.p = new BabyjubjubPublicKeyParameterDto(values.p);
    }
  }
}
