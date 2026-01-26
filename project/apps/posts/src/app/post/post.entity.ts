import { Post } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class PostEntity implements Post, Entity<string> {
  public id?: string;
  public title: string;
  public categories: Post['categories'];
  public description: string;
  public content: string;
  public userId: string;
  public comments: Post['comments'];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(post: Partial<Post>) {
    this.populate(post);
    const now = new Date();
    this.createdAt = post.createdAt ?? now;
    this.updatedAt = post.updatedAt ?? now;
    this.comments = post.comments ?? [];
    this.categories = post.categories ?? [];
  }

  public toPOJO(): Record<string, unknown> {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    content: this.content,
    userId: this.userId,
    categories: this.categories,
    comments: this.comments,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  } as Record<string, unknown>;
}

  public populate(data: Partial<Post>): void {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.content = data.content;
    this.userId = data.userId;
    this.categories = data.categories;
    this.comments = data.comments;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
