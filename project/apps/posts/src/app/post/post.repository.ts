import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/posts/models';
import { PostEntity } from './post.entity';
import { PostMeta, PostStatus, PostType } from '@project/shared/app/types';
import { BasePrismaRepository } from '@project/shared/core';
import { CreatePostDto } from './dto/create-post.dto';
import { MAX_POST_LIMIT } from './post.constant';
import { PostFilter, postFilterToPrisma } from './post-category.filter';

@Injectable()
export class PostRepository extends BasePrismaRepository<
  PostEntity,
  PostMeta
> {
  constructor(
    protected readonly client: PrismaClientService
  ) {
    super(client, PostEntity.fromObject);
  }

  public async save(entity: PostEntity): Promise<PostEntity> {
    const record = await this.client.post.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
    });

    if (! document) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: PostFilter): Promise<PostEntity[]> {
    const where = filter ?? postFilterToPrisma(filter);

    const documents = await this.client.post.findMany({
      where,
      take: MAX_POST_LIMIT
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      }
    });
  }

  public async update(id: string): Promise<PostEntity> {
    const updatedCategory = await this.client.post.update({
      where: { id },
      data: {
      }
    });

    return this.createEntityFromDocument(updatedCategory);
  }

  public async createPost(
    dto: CreatePostDto,
    authorId: string,
  ): Promise<PostEntity> {
    return this.client.$transaction(async (tx) => {
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
}
