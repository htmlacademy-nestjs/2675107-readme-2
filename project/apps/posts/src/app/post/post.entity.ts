import { Entity } from '@project/shared/core';
import { PostLink, PostMeta, PostPhoto, PostQuote, PostStatus, PostText, PostType, PostVideo } from '@project/shared/app/types';

export class PostEntity implements PostMeta, Entity<string, PostMeta> {
  public id?: string;

  public type: PostType;
  public status: PostStatus;

  public authorId: string;
  public originalAuthorId?: string;
  public originalPostId?: string;
  public isRepost: boolean;

  public tags: string[];

  public likesCount: number;
  public commentsCount: number;

  public createdAt: Date;
  public publishedAt: Date;

  public data?: PostPhoto | PostText | PostVideo | PostQuote | PostLink | null;

  constructor(post: Partial<PostMeta>) {
    this.populate(post);

    const now = new Date();
    this.createdAt = post.createdAt ?? now;
    this.publishedAt = post.publishedAt ?? now;

    this.status = post.status ?? PostStatus.PUBLISHED;
    this.isRepost = post.isRepost ?? false;

    this.likesCount = post.likesCount ?? 0;
    this.commentsCount = post.commentsCount ?? 0;
    this.tags = post.tags ?? [];

    this.data = post.data ?? null;
  }

  public populate(data: Partial<PostMeta>): void {
    Object.assign(this, data);
  }

  public toPOJO(): PostMeta & Record<string, any> {
    const base = {
      id: this.id,
      type: this.type,
      status: this.status,
      authorId: this.authorId,
      originalAuthorId: this.originalAuthorId,
      originalPostId: this.originalPostId,
      isRepost: this.isRepost,
      tags: this.tags,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
      createdAt: this.createdAt,
      publishedAt: this.publishedAt,
    };

    if (this.data) {
      const { postId, ...rest } = this.data;
      return { ...base, ...rest };
    }

    return base;
  }


  static fromObject(data: PostMeta): PostEntity {
    return new PostEntity({
      ...data,
      type: data.type as unknown as PostType,
      status: data.status as unknown as PostStatus,
    });
  }
}
