import { BabyjubjubParameterDto, IBabyjubjubParameterDto } from './babyjubjub-parameter.dto';
import { ApiProperty } from '@nestjs/swagger';

export interface IBabyjubjubPublicKeyParameterDto {
  x: IBabyjubjubParameterDto;
  y: IBabyjubjubParameterDto;
  JUBJUB_Q: IBabyjubjubParameterDto;
  JUBJUB_E: IBabyjubjubParameterDto;
  JUBJUB_C: IBabyjubjubParameterDto;
  JUBJUB_L: IBabyjubjubParameterDto;
  JUBJUB_A: IBabyjubjubParameterDto;
  JUBJUB_D: IBabyjubjubParameterDto;
  one: IBabyjubjubParameterDto;
  zero: IBabyjubjubParameterDto;
}

export class BabyjubjubPublicKeyParameterDto implements IBabyjubjubPublicKeyParameterDto {
  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  x: BabyjubjubParameterDto;

  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  y: BabyjubjubParameterDto;

  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  JUBJUB_Q: BabyjubjubParameterDto;

  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  JUBJUB_E: BabyjubjubParameterDto;

  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  JUBJUB_C: BabyjubjubParameterDto;

  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  JUBJUB_L: BabyjubjubParameterDto;

  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  JUBJUB_A: BabyjubjubParameterDto;

  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  JUBJUB_D: BabyjubjubParameterDto;

  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  one: BabyjubjubParameterDto;

  @ApiProperty({ required: true, type: BabyjubjubParameterDto })
  zero: BabyjubjubParameterDto;

  constructor(values: Partial<IBabyjubjubPublicKeyParameterDto>) {
    if (values) {
      this.x = new BabyjubjubParameterDto(values.x);
      this.y = new BabyjubjubParameterDto(values.y);
      this.JUBJUB_Q = new BabyjubjubParameterDto(values.JUBJUB_Q);
      this.JUBJUB_E = new BabyjubjubParameterDto(values.JUBJUB_E);
      this.JUBJUB_C = new BabyjubjubParameterDto(values.JUBJUB_C);
      this.JUBJUB_L = new BabyjubjubParameterDto(values.JUBJUB_L);
      this.JUBJUB_A = new BabyjubjubParameterDto(values.JUBJUB_A);
      this.JUBJUB_D = new BabyjubjubParameterDto(values.JUBJUB_D);
      this.one = new BabyjubjubParameterDto(values.one);
      this.zero = new BabyjubjubParameterDto(values.zero);
    }
  }
}
