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

  public async createComment(
    dto: CreateCommentDto,
    postId: string,
    userId: string,
  ): Promise<CommentEntity> {
    return this.client.$transaction(async (tx) => {
      const comment = await tx.comment.create({
        data: {
          message: dto.message,
          postId,
          userId
        }
      })

      await tx.post.update({
        where: { id: postId},
        data: {
          commentsCount: { increment: 1}
        }
      })

      return this.createEntityFromDocument(comment)
    })
  }

  public async findById(id: string): Promise<CommentEntity | null> {
    const record = await this.client.comment.findUnique({
      where: { id },
    });

    return record ? this.createEntityFromDocument(record) : null;
  }

  public async deleteById(commentId: string): Promise<void> {
    return this.client.$transaction(async (tx) => {
      const record = await this.client.comment.findUnique({
        where: { id: commentId },
      });

      await tx.comment.delete({
        where: { id: commentId }
      })

      await tx.post.update({
        where: { id: record.postId },
        data: {
          commentsCount: { decrement: 1}
        }
      })
    })
  }
}
