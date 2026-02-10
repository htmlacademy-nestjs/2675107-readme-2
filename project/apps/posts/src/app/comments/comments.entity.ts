import { Entity } from '@project/shared/core';
import { Comment } from '@project/shared/app/types';

export class CommentEntity implements Entity<string, Comment> {
  public id: string;
  public postId: string;
  public message: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.postId = comment.postId;
    this.message = comment.message;
    this.userId = comment.userId;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      postId: this.postId,
      message: this.message,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(comment: Comment): CommentEntity {
    return new CommentEntity(comment);
  }
}
