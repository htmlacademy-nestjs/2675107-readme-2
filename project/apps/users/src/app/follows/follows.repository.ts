import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FollowsModel } from './follows.model';
import { FollowsEntity } from './follows.entity';
import { BaseMongoRepository } from '@project/shared/core';


@Injectable()
export class FollowsRepository extends BaseMongoRepository<
  FollowsEntity,
  FollowsModel
> {
  constructor(
    @InjectModel(FollowsModel.name)
    followsModel: Model<FollowsModel>,
  ) {
    super(followsModel, (document) => new FollowsEntity(document));
  }

  public async findByFollowerAndFollowing(
    followerId: string,
    followingId: string,
  ): Promise<FollowsEntity | null> {
    const document = await this.model
      .findOne({ followerId, followingId })
      .exec();

    return this.createEntityFromDocument(document);
  }
}
