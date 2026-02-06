import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/posts/models';
import { Comment } from '@project/shared/app/types';
import { BasePrismaRepository } from '@project/shared/core';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comments.entity';

@Injectable()
export class CommentsRepository extends BasePrismaRepository<
  CommentEntity,
  Comment
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, CommentEntity.fromObject);
  }

  public async findByPostId(
    postId: string,
    take: number,
    skip: number,
  ): Promise<CommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: { postId },
      take,
      skip,
      orderBy: { createdAt: 'asc' },
    });

    return records.map((record) =>
      this.createEntityFromDocument(record),
    );
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: { id },
    });
  }

  public async createComment(
    dto: CreateCommentDto,
    postId: string,
    userId: string,
  ): Promise<CommentEntity> {
    const record = await this.client.comment.create({
      data: {
        message: dto.message,
        postId: postId,
        userId,
      },
    });

    return this.createEntityFromDocument(record);
  }

  public async findById(id: string): Promise<CommentEntity | null> {
    const record = await this.client.comment.findUnique({
      where: { id },
    });

    return record ? this.createEntityFromDocument(record) : null;
  }
}
