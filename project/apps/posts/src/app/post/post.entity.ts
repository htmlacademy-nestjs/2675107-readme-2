import { BlogPost } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class PostEntity implements BlogPost, Entity<string> {
  public id?: string;
  public title: string;
  public content: string;
  public authorId: string;
  public tags: string[];
  public createdAt: Date;

  constructor(post: BlogPost) {
    this.populate(post)
    this.createdAt = new Date();
  }

  public toPOJO() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      authorId: this.authorId,
      tags: this.tags,
      createdAt: this.createdAt,
    };
  }

  public populate(data: BlogPost): void {
    this.title = data.title;
    this.content = data.content;
    this.authorId = data.authorId;
    this.tags = data.tags ?? [];
  }

}
