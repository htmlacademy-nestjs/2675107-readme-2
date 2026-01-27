import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/posts/models';
import { PostEntity } from './post.entity';
import { PostStatus } from '@project/shared/app/types';
import { BasePrismaRepository } from '@project/shared/core';

@Injectable()
export class PostRepository extends BasePrismaRepository<
  PostEntity,
  PrismaClientService['post'],
  any,
  any
> {
  constructor(prisma: PrismaClientService) {
    super(
      prisma.post,
      (data) => new PostEntity(data),
    );
  }

  public async findAll(): Promise<PostEntity[]> {
    const records = await (this.prisma as any).findMany();
    return records.map((record) => new PostEntity(record));
  }

  public async findPublished(): Promise<PostEntity[]> {
    const records = await (this.prisma as any).findMany({
      where: { status: PostStatus.PUBLISHED },
    });

    return records.map((record) => new PostEntity(record));
  }

  public async findByAuthor(authorId: string): Promise<PostEntity[]> {
    const records = await (this.prisma as any).findMany({
      where: { authorId },
    });

    return records.map((record) => new PostEntity(record));
  }
}
