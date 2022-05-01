import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalPassportStrategy } from './strategies/local-passport-strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60000s' }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalPassportStrategy, JwtStrategy, LocalAuthGuard, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard]
})
export class AuthModule {

}
