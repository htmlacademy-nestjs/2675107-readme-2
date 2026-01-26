import { Entity } from '@project/shared/core';
import { Post, PostStatus } from '@project/shared/app/types';

export class PostEntity implements Post, Entity<string> {
  public id?: string;

  public type: Post['type'];
  public status: PostStatus;

  public authorId: string;
  public originalAuthorId?: string;
  public originalPostId?: string;
  public isRepost: boolean;

  public title?: string;
  public announcement?: string;
  public content?: string;
  public quoteAuthor?: string;
  public videoUrl?: string;
  public linkUrl?: string;
  public linkDescription?: string;
  public photoUrl?: string;

  public tags: string[];

  public likesCount: number;
  public commentsCount: number;

  public createdAt: Date;
  public publishedAt: Date;

  constructor(post: Partial<Post>) {
    this.populate(post);

    const now = new Date();
    this.createdAt = post.createdAt ?? now;
    this.publishedAt = post.publishedAt ?? now;

    this.status = post.status ?? PostStatus.PUBLISHED;
    this.isRepost = post.isRepost ?? false;

    this.likesCount = post.likesCount ?? 0;
    this.commentsCount = post.commentsCount ?? 0;
    this.tags = post.tags ?? [];
  }

  public populate(data: Partial<Post>): void {
    Object.assign(this, data);
  }

  public toPOJO(): Record<string, unknown> {
    return { ...this } as Record<string, unknown>;
  }
}
