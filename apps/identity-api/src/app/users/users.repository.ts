import { Injectable } from '@nestjs/common';
import { UserEntity, UserEntityDocument } from './user.entity';
import {
  IdentityUserDto,
  IdentityUserRegisterDto,
  UnsecureIdentityUserDto,
} from '@decentralized-freelance-news/api-shared-lib';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(UserEntity.name) private userEntityDocumentModel: Model<UserEntityDocument>) {}

  async findOneByUsername(username: string): Promise<UnsecureIdentityUserDto | null> {
    const foundEntity: UserEntity = await this.userEntityDocumentModel.findOne({ username });
    if (!foundEntity) {
      return null;
    }
    return new UnsecureIdentityUserDto({
      id: foundEntity.id,
      username: foundEntity.username,
      password: foundEntity.password,
    });
  }

  async findOneById(id: string): Promise<IdentityUserDto | null> {
    const foundEntity: UserEntity = await this.userEntityDocumentModel.findOne({ id });
    if (!foundEntity) {
      return null;
    }
    return UsersRepository.mapToIdentityUser(foundEntity);
  }

  async findAll(): Promise<IdentityUserDto[]> {
    const foundEntities: UserEntity[] = await this.userEntityDocumentModel.find();
    return foundEntities.map((entity) => UsersRepository.mapToIdentityUser(entity));
  }

  async addUser(user: IdentityUserRegisterDto): Promise<IdentityUserDto> {
    // TODO: hash password
    const entity = new UserEntity(uuidv4(), user.username, user.password);
    const entityModel = new this.userEntityDocumentModel(entity);
    const savedEntity = await entityModel.save();
    return UsersRepository.mapToIdentityUser(savedEntity);
  }

  private static mapToIdentityUser(userEntity: UserEntity): IdentityUserDto {
    return new IdentityUserDto({ id: userEntity.id, username: userEntity.username });
  }
}
