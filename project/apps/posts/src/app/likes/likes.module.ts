import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/shared/posts/models';
import { PostRepository } from '../post/post.repository';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesRepository } from './likes.repository';

@Module({
  imports: [PrismaClientModule],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository, PostRepository]
})
export class CommentsModule {}
