import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/posts/models';
import { PostEntity } from './post.entity';
import { PostStatus, PostType } from '@project/shared/app/types';
import { BasePrismaRepository } from '@project/shared/core';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostRepository extends BasePrismaRepository<
  PostEntity,
  PrismaClientService['post'],
  any,
  any
> {
  constructor(prisma: PrismaClientService) {
    super(prisma.post, (data) => new PostEntity(data));
  }

  public async findAll(options?: { page?: number; limit?: number }): Promise<PostEntity[]> {
    const { page = 1, limit = 25 } = options || {};
    const records = await this.prisma.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: 'desc' } as Prisma.PostOrderByWithRelationInput,
    });
    return records.map((r) => new PostEntity({
      ...r,
      type: r.type as unknown as PostType,
      status: r.status as unknown as PostStatus
    }));
  }

  public async findPublished(options?: { page?: number; limit?: number }): Promise<PostEntity[]> {
    const { page = 1, limit = 25 } = options || {};
    const records = await this.prisma.findMany({
      where: { status: PostStatus.PUBLISHED } as Prisma.PostWhereInput,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: 'desc' } as Prisma.PostOrderByWithRelationInput,
    });
    return records.map((r) => new PostEntity({
      ...r,
      type: r.type as unknown as PostType,      // приводим к твоему enum
      status: r.status as unknown as PostStatus // если нужно для PostStatus
    }));
  }

  public async findByAuthor(authorId: string, options?: { page?: number; limit?: number }): Promise<PostEntity[]> {
    const { page = 1, limit = 25 } = options || {};
    const records = await this.prisma.findMany({
      where: { authorId } as Prisma.PostWhereInput,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: 'desc' } as Prisma.PostOrderByWithRelationInput,
    });
    return records.map((r) => new PostEntity({
      ...r,
      type: r.type as unknown as PostType,      // приводим к твоему enum
      status: r.status as unknown as PostStatus // если нужно для PostStatus
    }));return records.map((r) => new PostEntity({
      ...r,
      type: r.type as unknown as PostType,      // приводим к твоему enum
      status: r.status as unknown as PostStatus // если нужно для PostStatus
    }));
  }

  public async findByStatusAndAuthor(status: PostStatus, authorId: string): Promise<PostEntity[]> {
    const records = await this.prisma.findMany({
      where: { status, authorId } as Prisma.PostWhereInput,
      orderBy: { publishedAt: 'desc' } as Prisma.PostOrderByWithRelationInput,
    });
    return records.map((r) => new PostEntity({
      ...r,
      type: r.type as unknown as PostType,      // приводим к твоему enum
      status: r.status as unknown as PostStatus // если нужно для PostStatus
    }));return records.map((r) => new PostEntity({
      ...r,
      type: r.type as unknown as PostType,      // приводим к твоему enum
      status: r.status as unknown as PostStatus // если нужно для PostStatus
    }));
  }
}
