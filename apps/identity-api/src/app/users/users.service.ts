import { UsersRepository } from './users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IdentityUserDto,
  IdentityUserRegisterDto,
  UnsecureIdentityUserDto,
} from '@decentralized-freelance-news/api-shared-lib';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOneByUsername(username: string): Promise<UnsecureIdentityUserDto | null> {
    return this.usersRepository.findOneByUsername(username);
  }

  async findOneById(id: string): Promise<IdentityUserDto> {
    const foundUser = this.usersRepository.findOneById(id);
    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  async findAll(): Promise<IdentityUserDto[]> {
    return this.usersRepository.findAll();
  }

  async addUser(user: IdentityUserRegisterDto): Promise<IdentityUserDto> {
    return this.usersRepository.addUser(user);
  }
}
