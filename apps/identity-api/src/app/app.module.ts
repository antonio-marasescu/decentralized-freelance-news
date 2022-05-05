import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseUrl } from './app.configuration';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ZkpModule } from './zkp/zkp.module';

@Module({
  imports: [MongooseModule.forRoot(databaseUrl), UsersModule, AuthModule, ZkpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
