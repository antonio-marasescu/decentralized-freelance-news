import { ApiProperty } from '@nestjs/swagger';

export interface IIdentityUserAccessTokenDto {
  access_token: string;
}

export class IdentityUserAccessTokenDto implements IIdentityUserAccessTokenDto {
  @ApiProperty({ description: 'The JWT access token.' })
  access_token: string;
}
