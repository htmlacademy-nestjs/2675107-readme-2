import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository
  ) {}

  public async create(dto: CreatePostDto, authorId: string) {
    const post = new PostEntity({
      ...dto,
      authorId,
    });

    return this.postRepository.save(post);
  }

  public async findById(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  public async findAllPublished() {
    return this.postRepository.findPublished();
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
}
