import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AUTH_FEATURE } from './auth.config';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  IdentityUserAccessTokenDto,
  IdentityUserDto,
  IdentityUserLoginDto,
  IdentityUserRegisterDto,
} from '@decentralized-freelance-news/api-shared-lib';

@ApiBearerAuth()
@ApiTags(AUTH_FEATURE.name)
@Controller(AUTH_FEATURE.key)
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({
    description: 'The JWT access token.',
    type: IdentityUserAccessTokenDto,
  })
  @ApiBadRequestResponse({
    description: 'The user provided invalid authentication credentials.',
  })
  @ApiBody({ type: IdentityUserLoginDto })
  async login(@Request() request): Promise<IdentityUserAccessTokenDto> {
    return this.authService.login(request.user);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'The user has successfully registered.',
    type: IdentityUserDto,
  })
  async register(@Body() user: IdentityUserRegisterDto): Promise<IdentityUserDto> {
    return this.usersService.addUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  @ApiOkResponse({
    description: 'The user as per provided id.',
    type: IdentityUserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The user provided invalid authentication credentials.',
  })
  @ApiNotFoundResponse({
    description: 'The user with the provided id was not found.',
  })
  async findOneById(@Param('id') id: string): Promise<IdentityUserDto> {
    return this.usersService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users/username/:username')
  @ApiOkResponse({
    description: 'The user as per provided username.',
    type: IdentityUserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'The user provided invalid authentication credentials.',
  })
  @ApiNotFoundResponse({
    description: 'The user with the provided username was not found.',
  })
  async findOneByUsername(@Param('username') username: string): Promise<IdentityUserDto> {
    return this.usersService.findOneByUsername(username);
  }
}
