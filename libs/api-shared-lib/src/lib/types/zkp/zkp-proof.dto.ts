import { Proof } from 'zokrates-js/node';
import { ApiProperty } from '@nestjs/swagger';

export interface IZkpProofDto extends Proof {
  inputs: string[];
  proof: object;
}

export class ZkpProofDto implements Proof, IZkpProofDto {
  @ApiProperty({ required: true })
  inputs: string[];
  @ApiProperty({ required: true, minLength: 13, maxLength: 13 })
  proof: object;

  constructor(values: Partial<IZkpProofDto | Proof>) {
    if (values) {
      this.inputs = values.inputs;
      this.proof = values.proof;
    }
  }
}
