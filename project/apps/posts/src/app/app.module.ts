import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [PostModule, CommentsModule, LikesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
