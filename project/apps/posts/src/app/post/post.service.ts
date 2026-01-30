import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { PostStatus } from '@project/shared/app/types';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(dto: CreatePostDto, authorId: string) {
  return this.postRepository.createPost(dto, authorId);
}


  public async findById(id: string) {
    const post = await this.postRepository.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  public async findAllPublished() {
    return this.postRepository.find();
  }

  public async update(id: string, dto: Partial<CreatePostDto>, userId: string) {
    const post = await this.findById(id);
    if (post.authorId !== userId) {
      throw new NotFoundException('Cannot edit this post');
    }
    const updateData = {
      ...dto,
      publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined,
    }

    post.populate(updateData);
    return this.postRepository.update(id);
  }

  public async delete(id: string, userId: string) {
    const post = await this.findById(id);
    if (post.authorId !== userId) {
      throw new NotFoundException('Cannot delete this post');
    }

    await this.postRepository.deleteById(id);
  }

  public async repost(postId: string, userId: string) {
    const original = await this.findById(postId);
    const repost = new PostEntity({
      ...original.toPOJO(),
      id: undefined,
      authorId: userId,
      originalAuthorId: original.authorId,
      originalPostId: original.id,
      isRepost: true,
      publishedAt: new Date(),
    });
    return this.postRepository.save(repost);
  }

  public async findByAuthor(authorId: string) {
    return this.postRepository.find({ authorId: authorId});
  }

  public async findDrafts(userId: string) {
    return this.postRepository.find({status: PostStatus.DRAFT, authorId: userId});
  }
}
