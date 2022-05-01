import { ApiProperty } from '@nestjs/swagger';

export interface IIdentityUserLoginDto {
  username: string;
  password?: string;
}

export class IdentityUserLoginDto implements IIdentityUserLoginDto {
  @ApiProperty({ required: true, minLength: 4 })
  username: string;

  @ApiProperty({ required: true, minLength: 4 })
  password?: string;

  constructor(values: Partial<IIdentityUserLoginDto>) {
    if (values) {
      this.username = values.username;
      this.password = values.password;
    }
  }
}
