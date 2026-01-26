import { Injectable } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { BaseMemoryRepository } from '@project/shared/core';

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostEntity> {
  public async findAll(): Promise<PostEntity[]> {
    return Array.from(this.entities.values());
  }

  public async findPublished(): Promise<PostEntity[]> {
    return Array.from(this.entities.values()).filter(
      (post) => post.status === 'published'
    );
  }

  public async findByAuthor(authorId: string): Promise<PostEntity[]> {
    return Array.from(this.entities.values()).filter(
      (post) => post.authorId === authorId
    );
  }
}
