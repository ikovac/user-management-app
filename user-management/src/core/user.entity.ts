import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import { ValuesType } from 'utility-types';
import BaseEntity from '../shared/database/base.entity';

const Role = {
  USER: 'User',
  ADMIN: 'Admin'
} as const;

type Role = ValuesType<typeof Role>;

@Entity()
class User extends BaseEntity {
  static Role = Role;

  @Property()
  public firstName: string;

  @Property()
  lastName: string;

  @Property()
  @Unique()
  email: string;

  @Enum()
  role: Role;

  constructor(firstName: string, lastName: string, email: string, role: Role) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  }
}

export default User;
