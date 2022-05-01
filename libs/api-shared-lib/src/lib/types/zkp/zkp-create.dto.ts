import { ApiProperty } from '@nestjs/swagger';
import { IZkpIdentityDto, ZkpIdentityDto } from './zkp-identity.dto';
import { BabyjubjubPrivateKeyDto, IBabyjubjubPrivateKeyDto } from './babyjubjub/babyjubjub-private-key.dto';

export interface IZkpCreateDto {
  privateKey: IBabyjubjubPrivateKeyDto;
  identity: IZkpIdentityDto;
}

export class ZkpCreateDto implements IZkpCreateDto {
  @ApiProperty({
    required: true,
    minLength: 4,
    description: 'The private key generated using Jubjub parameters by the user.',
  })
  privateKey: BabyjubjubPrivateKeyDto;

  @ApiProperty({ required: true, type: ZkpIdentityDto, description: 'The sensitive personal identity of the user.' })
  identity: ZkpIdentityDto;

  constructor(values: Partial<IZkpCreateDto>) {
    if (values) {
      this.privateKey = new BabyjubjubPrivateKeyDto(values.privateKey);
      this.identity = values.identity;
    }
  }
}
