import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [PostModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
