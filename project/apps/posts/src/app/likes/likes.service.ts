import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { PostRepository } from '../post/post.repository';
import { LikeEntity } from './likes.entity';

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly postRepository: PostRepository,
  ) {}

  public async create(postId: string, userId: string): Promise<LikeEntity> {
    const post = await this.postRepository.findById(postId);
    if (!post) throw new NotFoundException('Пост не найден');

    if (post.status !== 'PUBLISHED') {
      throw new ForbiddenException('Нельзя лайкать неопубликованные посты');
    }

    const existingLike = await this.likesRepository.findByUserAndPost(userId, postId);
    if (existingLike) {
      throw new ForbiddenException('Лайк уже поставлен');
    }

    return this.likesRepository.createLike(userId, postId);
  }

  public async delete(postId: string, userId: string): Promise<void> {
    const existingLike = await this.likesRepository.findByUserAndPost(userId, postId);
    if (!existingLike) throw new NotFoundException('Лайк не найден');

    await this.likesRepository.deleteLike(userId, postId);
  }
}
