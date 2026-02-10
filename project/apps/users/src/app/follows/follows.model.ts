import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Follows } from '@project/shared/app/types';

@Schema({
  collection: 'follows',
  timestamps: true,
})
export class FollowsModel extends Document implements Follows {
  @Prop({
    required: true,
  })
  public followerId: string;

  @Prop({
    required: true,
  })
  public followingId: string;
}

export const FollowsSchema = SchemaFactory.createForClass(FollowsModel);
