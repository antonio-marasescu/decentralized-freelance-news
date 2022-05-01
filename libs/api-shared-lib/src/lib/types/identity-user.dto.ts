import { ApiProperty } from '@nestjs/swagger';

export interface IIdentityUserDto {
  id?: string;
  username: string;
}

export class IdentityUserDto implements IIdentityUserDto {
  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: true, minLength: 4 })
  username: string;

  constructor(values: Partial<IIdentityUserDto>) {
    if (values) {
      this.id = values.id;
      this.username = values.username;
    }
  }
}
