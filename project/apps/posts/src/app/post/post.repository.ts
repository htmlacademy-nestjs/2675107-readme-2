import { Injectable } from "@nestjs/common";
import { BaseMemoryRepository } from '@project/shared/core'
import { PostEntity } from "./post.entity";

@Injectable()
export class PostRepository extends BaseMemoryRepository<PostEntity> {
  public findByAuthor(authorId: string): Promise<PostEntity[]> {
    const entities = Array.from(this.entities.values());
    return Promise.resolve(
      entities.filter((post) => post.authorId === authorId)
    );
  }
  public async findAll(): Promise<PostEntity[]> {
    return Array.from(this.entities.values());
  }
}
