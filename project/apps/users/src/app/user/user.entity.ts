import { AuthUser } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { SALT_ROUNDS } from './user.constant';
import { compare, genSalt, hash } from 'bcrypt';

export class UserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public name: string;
  public postsCount: number;
  public likes: number;
  public followers: number;
  public following: number;
  public dateRegistry: Date;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user)
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      postsCount: this.postsCount,
      likes: this.likes,
      followers: this.followers,
      following: this.following,
      dateRegistry: this.dateRegistry,
      passwordHash: this.passwordHash,
    };
  }

  public populate(data: AuthUser): void {
    this.email = data.email;
    this.name = data.name;
    this.passwordHash = data.passwordHash
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  static fromObject(data: AuthUser): UserEntity {
    return new UserEntity(data);
  }
}
