import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { PostRepository } from '../post/post.repository';
import { LikeEntity } from './likes.entity';
import { LIKE_ALREADY_EXISTS, LIKE_NOT_FOUND, POST_NOT_PUBLISHED } from './likes.constant';

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly postRepository: PostRepository,
  ) {}

  public async create(postId: string, userId: string): Promise<LikeEntity> {
    const post = await this.postRepository.findById(postId);

    if (post.status !== 'PUBLISHED') {
      throw new ConflictException(POST_NOT_PUBLISHED);
    }

    const existingLike = await this.likesRepository.findByUserAndPost(userId, postId);
    if (existingLike) {
      throw new ConflictException(LIKE_ALREADY_EXISTS);
    }

    return this.likesRepository.createLike(userId, postId);
  }

  public async delete(postId: string, userId: string): Promise<void> {
    const existingLike = await this.likesRepository.findByUserAndPost(userId, postId);
    if (!existingLike) throw new NotFoundException(LIKE_NOT_FOUND);

    await this.likesRepository.deleteLike(userId, postId);
  }
}
