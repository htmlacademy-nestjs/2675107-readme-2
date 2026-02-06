import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/shared/posts/models';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { PostRepository } from '../post/post.repository';

@Module({
  imports: [PrismaClientModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, PostRepository]
})
export class CommentsModule {}
