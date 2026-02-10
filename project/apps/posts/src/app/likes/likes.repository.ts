import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/posts/models';
import { BasePrismaRepository } from '@project/shared/core';
import { Like } from '@project/shared/app/types';
import { LikeEntity } from './likes.entity';

@Injectable()
export class LikesRepository extends BasePrismaRepository<LikeEntity, Like> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, LikeEntity.fromObject);
  }

  public async findByUserAndPost(userId: string, postId: string): Promise<LikeEntity | null> {
    const record = await this.client.like.findFirst({
      where: { userId, postId },
    });
    return record ? this.createEntityFromDocument(record) : null;
  }

  public async createLike(userId: string, postId: string): Promise<LikeEntity> {
    return this.client.$transaction(async (tx) => {
      const like = await tx.like.create({
        data: {
          postId,
          userId
        }
      })

      await tx.post.update({
        where: { id: postId },
        data: {
          likesCount: { increment: 1}
        }
      })

      return this.createEntityFromDocument(like)
    })
  }

  public async deleteLike(userId: string, postId: string): Promise<void> {

    return this.client.$transaction(async (tx) => {
      const record = await this.findByUserAndPost(userId, postId)

      await tx.like.delete({
        where: { id: record.id }
      })

      await tx.post.update({
        where: { id: postId },
        data: {
          likesCount: { decrement: 1}
        }
      })
    })
  }
}
