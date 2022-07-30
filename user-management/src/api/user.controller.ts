import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { pick } from 'lodash';
import User from '../core/user.entity';
import { AuthGuard } from './authenticate.guard';
import { Permissions } from './permissions.decorator';

type CreateUserDto = {
  firstName: User['firstName'];
  lastName: User['lastName'];
  email: User['email'];
  role: User['role'];
};

@Controller('api/users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @Inject('USER_MANAGEMENT_EVENT_PUBLISHER')
    private eventPublisher: ClientProxy
  ) {}

  @Get()
  @Permissions('read:users')
  async list(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  @Post()
  @Permissions('create:users')
  async create(
    @Body() { firstName, lastName, email, role }: CreateUserDto
  ): Promise<User> {
    const user = new User(firstName, lastName, email, role);
    await this.userRepository.persistAndFlush(user);
    this.eventPublisher.emit(
      'USER_CREATED',
      pick(user, ['email', 'role', 'firstName', 'lastName'])
    );
    return user;
  }
}
