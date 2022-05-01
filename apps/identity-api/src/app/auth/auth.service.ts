import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayloadModel } from './models/jwt-payload.model';
import { IdentityUserAccessTokenDto, IdentityUserDto } from '@decentralized-freelance-news/api-shared-lib';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<IdentityUserDto> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.password === password) {
      delete user.password;
      return new IdentityUserDto({ id: user.id, username: user.username });
    }
    return null;
  }

  async login(user: JwtPayloadModel): Promise<IdentityUserAccessTokenDto> {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
