import { ApiProperty } from '@nestjs/swagger';
import { BabyjubjubPublicKeyDto, IBabyjubjubPublicKeyDto } from './babyjubjub/babyjubjub-public-key.dto';
import { BabyjubjubPrivateKeyDto, IBabyjubjubPrivateKeyDto } from './babyjubjub/babyjubjub-private-key.dto';

export interface IZkpKeysDto {
  publicKey: IBabyjubjubPublicKeyDto;
  privateKey: IBabyjubjubPrivateKeyDto;
}

export class ZkpKeysDto implements IZkpKeysDto {
  @ApiProperty({
    required: true,
    description: 'Public key generated as per BabyJubJub parameters.',
    type: BabyjubjubPublicKeyDto,
  })
  publicKey: BabyjubjubPublicKeyDto;

  @ApiProperty({
    required: true,
    description: 'Private key generated as per BabyJubJub parameters.',
    type: BabyjubjubPrivateKeyDto,
  })
  privateKey: BabyjubjubPrivateKeyDto;

  constructor(values: Partial<IZkpKeysDto>) {
    if (values) {
      this.publicKey = new BabyjubjubPublicKeyDto(values.publicKey);
      this.privateKey = new BabyjubjubPrivateKeyDto(values.privateKey);
    }
  }
}
