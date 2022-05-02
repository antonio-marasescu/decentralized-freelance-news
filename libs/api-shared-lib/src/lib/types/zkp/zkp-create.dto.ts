import { ApiProperty } from '@nestjs/swagger';
import { IZkpIdentityDto, ZkpIdentityDto } from './zkp-identity.dto';
import { BabyjubjubPrivateKeyDto, IBabyjubjubPrivateKeyDto } from './babyjubjub/babyjubjub-private-key.dto';
import { BabyjubjubPublicKeyDto, IBabyjubjubPublicKeyDto } from './babyjubjub/babyjubjub-public-key.dto';

export interface IZkpCreateDto {
  privateKey: IBabyjubjubPrivateKeyDto;
  publicKey: IBabyjubjubPublicKeyDto;
  identity: IZkpIdentityDto;
}

export class ZkpCreateDto implements IZkpCreateDto {
  @ApiProperty({
    required: true,
    description: 'The private key generated using Jubjub parameters by the user.',
  })
  privateKey: BabyjubjubPrivateKeyDto;

  @ApiProperty({
    required: true,
    description: 'The public key generated using Jubjub parameters by the user.',
  })
  publicKey: BabyjubjubPublicKeyDto;

  @ApiProperty({ required: true, type: ZkpIdentityDto, description: 'The sensitive personal identity of the user.' })
  identity: ZkpIdentityDto;

  constructor(values: Partial<IZkpCreateDto>) {
    if (values) {
      this.privateKey = new BabyjubjubPrivateKeyDto(values.privateKey);
      this.publicKey = new BabyjubjubPublicKeyDto(values.publicKey);
      this.identity = values.identity;
    }
  }
}
