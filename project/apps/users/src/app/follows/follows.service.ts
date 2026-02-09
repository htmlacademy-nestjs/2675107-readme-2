import { ConflictException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { WARNING_ALREADY_SUBSCRIBED, WARNING_NOT_SUBSCRIBED, WARNING_SUBSCRIBE_SELF, WARNING_UNSUBSCRIBE_SELF } from './follows.constant';
import { FollowsRepository } from './follows.repository';
import { FollowsEntity } from './follows.entity';
import { UserRepository } from '../user/user.repository';
import { AUTH_USER_NOT_FOUND } from '../authentication/authentication.constant';

@Injectable()
export class FollowsService {
    private readonly logger = new Logger(FollowsService.name);

    constructor(
    private readonly followsRepository: FollowsRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async followUser(userId: string, followingId: string) {

    if(userId === followingId) {
      throw new ConflictException(WARNING_SUBSCRIBE_SELF);
    }

    try {
      const userToFollow = await this.userRepository.findById(followingId);
      if (!userToFollow) {
        throw new NotFoundException(AUTH_USER_NOT_FOUND);
      }

      // ЕСТЬ ЛИ СМЫСЛ СОЗДАВАТЬ ТАКОЙ МЕТОД ЕСЛИ МОЖНО ЧЕРЕЗ ИНДЕКС FollowsSchema.index(
      //   { followerId: 1, followingId: 1 },
      //   { unique: true }
      // ); ЧТО ДЕЛАЕТ СТРОКУ УНИКАЛЬНОЙ И ТОГДА ПРОВЕРКА БУДЕТ НЕНУЖНА???
      const existingFollow = await this.followsRepository.findByFollowerAndFollowing(userId, followingId);

      if (existingFollow) {
        throw new ConflictException(WARNING_ALREADY_SUBSCRIBED);
      }

      const followEntity = new FollowsEntity({
        followerId: userId,
        followingId,
      });

      await this.followsRepository.save(followEntity);

      await Promise.all([
        this.userRepository.incFollowers(followingId, 1),
        this.userRepository.incFollowing(userId, 1),
      ])
    } catch(error) {
      this.logger.error('[Follow error]: ' + error.message);
      throw new HttpException('Ошибка подписки на пользователя.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async unfollowUser(userId: string, followingId: string) {

    if(userId === followingId) {
      throw new ConflictException(WARNING_UNSUBSCRIBE_SELF);
    }

    try {
      const userToUnFollow = await this.userRepository.findById(followingId);
      if (!userToUnFollow) {
        throw new NotFoundException(AUTH_USER_NOT_FOUND);
      }

      const existingFollow = await this.followsRepository.findByFollowerAndFollowing(userId, followingId);

      if (!existingFollow) {
        throw new ConflictException(WARNING_NOT_SUBSCRIBED);
      }

      await this.followsRepository.deleteById(existingFollow.id);

      await Promise.all([
        this.userRepository.incFollowing(userId, -1),
        this.userRepository.incFollowers(followingId, -1)
      ])
    } catch(error) {
      this.logger.error('[Follow error]: ' + error.message);
      throw new HttpException('Ошибка отписки на пользователя.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
