import { ApiProperty } from '@nestjs/swagger';

export interface IIdentityUserRegisterDto {
  username: string;
  password?: string;
}

export class IdentityUserRegisterDto implements IIdentityUserRegisterDto {
  @ApiProperty({ required: true, minLength: 4 })
  username: string;

  @ApiProperty({ required: true, minLength: 4 })
  password?: string;

  constructor(values: Partial<IIdentityUserRegisterDto>) {
    if (values) {
      this.username = values.username;
      this.password = values.password;
    }
  }
}
