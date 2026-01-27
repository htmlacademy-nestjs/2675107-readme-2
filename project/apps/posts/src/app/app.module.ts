import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PrismaClientModule } from '@project/shared/posts/models';



@Module({
  imports: [PostModule, PrismaClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
