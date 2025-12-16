import { AuthUser } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { SALT_ROUNDS } from './user.constant';
import { compare, genSalt, hash } from 'bcrypt';

export class UserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public dateOfBirth: Date;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user)
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      dateOfBirth: this.dateOfBirth,
      passwordHash: this.passwordHash,
    };
  }

  public populate(data: AuthUser): void {
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.dateOfBirth = data.dateOfBirth;
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
