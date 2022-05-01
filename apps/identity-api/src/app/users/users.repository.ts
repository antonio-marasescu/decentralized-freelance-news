import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import {
  IdentityUserDto,
  IdentityUserRegisterDto,
  UnsecureIdentityUserDto,
} from '@decentralized-freelance-news/api-shared-lib';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>
  ) {}

  async findOneByUsername(username: string): Promise<UnsecureIdentityUserDto | null> {
    const foundEntity: UserEntity = await this.userEntityRepository.findOne({ username });
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
    const foundEntity: UserEntity = await this.userEntityRepository.findOne(id);
    if (!foundEntity) {
      return null;
    }
    return this.mapToIdentityUser(foundEntity);
  }

  async findAll(): Promise<IdentityUserDto[]> {
    const foundEntities: UserEntity[] = await this.userEntityRepository.find();
    return foundEntities.map((entity) => this.mapToIdentityUser(entity));
  }

  async addUser(user: IdentityUserRegisterDto): Promise<IdentityUserDto> {
    const entity = new UserEntity(undefined, user.username, user.password);
    const savedEntity: UserEntity = await this.userEntityRepository.save(entity);
    return this.mapToIdentityUser(savedEntity);
  }

  private mapToIdentityUser(userEntity: UserEntity): IdentityUserDto {
    return new IdentityUserDto({ id: userEntity.id, username: userEntity.username });
  }
}
