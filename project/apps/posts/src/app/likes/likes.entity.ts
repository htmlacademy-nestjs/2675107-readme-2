import { Entity } from '@project/shared/core';
import { Like } from '@project/shared/app/types';

export class LikeEntity implements Entity<string, Like> {
  public id: string;
  public postId: string;
  public userId: string;
  public createdAt: Date;

  constructor(like: Like) {
    this.id = like.id;
    this.postId = like.postId;
    this.userId = like.userId;
    this.createdAt = like.createdAt;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
      createdAt: this.createdAt,
    };
  }

  static fromObject(like: Like): LikeEntity {
    return new LikeEntity(like);
  }
}
