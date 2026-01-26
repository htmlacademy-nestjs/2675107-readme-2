
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { AUTH_USER_NOT_FOUND } from './post.constant';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository
  ) {}

  public async create(dto: CreatePostDto, userId: string) {

    if (!userId) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const postEntity = new PostEntity({
      ...dto,
      userId,
    });

    return this.postRepository.save(postEntity);
  }

  public async findById(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  public async findAll() {
    return this.postRepository.findAll();
  }
}
