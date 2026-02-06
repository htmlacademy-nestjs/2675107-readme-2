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

  async findByUserAndPost(userId: string, postId: string): Promise<LikeEntity | null> {
    const record = await this.client.like.findFirst({
      where: { userId, postId },
    });
    return record ? this.createEntityFromDocument(record) : null;
  }

  async createLike(userId: string, postId: string): Promise<LikeEntity> {
    const record = await this.client.like.create({
      data: { userId, postId },
    });
    return this.createEntityFromDocument(record);
  }

  async deleteLike(userId: string, postId: string): Promise<void> {
    const record = await this.client.like.findFirst({ where: { userId, postId } });

    if (!record) return;

    await this.client.like.delete({ where: { id: record.id } });
  }
}
