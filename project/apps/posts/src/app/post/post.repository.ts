import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/posts/models';
import { PostEntity } from './post.entity';
import { PostStatus, PostType } from '@project/shared/app/types';
import { BasePrismaRepository } from '@project/shared/core';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostRepository extends BasePrismaRepository<
  PostEntity,
  PrismaClientService['post'],
  any,
  any
> {
  constructor(prisma: PrismaClientService) {
    super(prisma, prisma.post, (data) => new PostEntity(data));
  }

  public async createPost(
    dto: CreatePostDto,
    authorId: string,
  ): Promise<PostEntity> {
    return this.withTransaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          type: dto.type,
          status: PostStatus.PUBLISHED,
          authorId,
          tags: dto.tags ?? [],
          publishedAt: new Date(),
        },
      });

      switch (dto.type) {
        case PostType.VIDEO:
          await tx.postVideo.create({
            data: {
              postId: post.id,
              title: dto.title,
              videoUrl: dto.videoUrl,
            },
          });
          break;

        case PostType.TEXT:
          await tx.postText.create({
            data: {
              postId: post.id,
              title: dto.title,
              announcement: dto.announcement,
              content: dto.content,
            },
          });
          break;

        case PostType.QUOTE:
          await tx.postQuote.create({
            data: {
              postId: post.id,
              quote: dto.quote,
              quoteAuthor: dto.quoteAuthor,
            },
          });
          break;

        case PostType.PHOTO:
          await tx.postPhoto.create({
            data: {
              postId: post.id,
              photoUrl: dto.photoUrl,
            },
          });
          break;

        case PostType.LINK:
          await tx.postLink.create({
            data: {
              postId: post.id,
              linkUrl: dto.linkUrl,
              linkDescription: dto.linkDescription,
            },
          });
          break;
      }

      return new PostEntity(post);
    });
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
      type: r.type as unknown as PostType,
      status: r.status as unknown as PostStatus
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
      type: r.type as unknown as PostType,
      status: r.status as unknown as PostStatus
    }));
  }

  public async findByStatusAndAuthor(status: PostStatus, authorId: string): Promise<PostEntity[]> {
    const records = await this.prisma.findMany({
      where: { status, authorId } as Prisma.PostWhereInput,
      orderBy: { publishedAt: 'desc' } as Prisma.PostOrderByWithRelationInput,
    });
    return records.map((r) => new PostEntity({
      ...r,
      type: r.type as unknown as PostType,
      status: r.status as unknown as PostStatus
    }));
  }

}
