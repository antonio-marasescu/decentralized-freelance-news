import { ApiProperty } from '@nestjs/swagger';

export interface IUnsecureIdentityUserDto {
  id?: string;
  username: string;
  password: string;
}

export class UnsecureIdentityUserDto implements IUnsecureIdentityUserDto {
  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: true, minLength: 4 })
  username: string;

  @ApiProperty({ required: true, minLength: 4 })
  password: string;

  constructor(values: Partial<IUnsecureIdentityUserDto>) {
    if (values) {
      this.id = values.id;
      this.username = values.username;
      this.password = values.password;
    }
  }
}
