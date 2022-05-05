import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UserEntity, UserEntitySchema } from './user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserEntitySchema }])],
  controllers: [],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
