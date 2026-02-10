import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowsModel, FollowsSchema } from './follows.model';
import { FollowsRepository } from './follows.repository';
import { FollowsController } from './follows.controller';
import { FollowsService } from './follows.service';
import { UserRepository } from '../user/user.repository';
import { UserModel, UserSchema } from '../user/user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: FollowsModel.name, schema: FollowsSchema},
    { name: UserModel.name, schema: UserSchema},
  ])],
  controllers: [FollowsController],
  providers: [FollowsRepository, UserRepository, FollowsService],
})
export class FollowsModule {}
