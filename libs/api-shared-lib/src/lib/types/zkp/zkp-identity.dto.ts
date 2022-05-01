import { ApiProperty } from '@nestjs/swagger';

export interface IZkpIdentityDto {
  name: string;
  identificationNumber: string;
}

export class ZkpIdentityDto implements IZkpIdentityDto {
  @ApiProperty({ required: true, minLength: 4, maxLength: 50 })
  name: string;

  @ApiProperty({ required: true, minLength: 13, maxLength: 13 })
  identificationNumber: string;

  constructor(values: Partial<IZkpIdentityDto>) {
    if (values) {
      this.name = values.name;
      this.identificationNumber = values.identificationNumber;
    }
  }
}
