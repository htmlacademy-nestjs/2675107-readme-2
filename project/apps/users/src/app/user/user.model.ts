import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser } from '@project/shared/app/types';;

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements AuthUser {
  @Prop({
    default: ''
  })
  public avatar: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
    default: 0
  })
  public likes: number;

  @Prop({
    required: true,
    default: 0
  })
  public postsCount: number;

  @Prop({
    required: true,
    default: 0
  })
  public followers: number;

  @Prop({
    required: true,
    default: 0
  })
  public following: number;

  @Prop({
    required: true,
    default: Date.now
  })
  public dateRegistry: Date;

  @Prop({
    required: true,
  })
  public passwordHash: string;

}

export const UserSchema = SchemaFactory.createForClass(UserModel);
