import { Body, Controller, Get, Param, Post, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { fillDto } from '@project/shared/helpers';
import { PostRdo } from './rdo/post.rdo';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({ status: 201 })
  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async create(@Body() dto: CreatePostDto) {
    const post = await this.postService.create(dto, 'user-id-1');
    return fillDto(PostRdo, post.toPOJO());
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.findById(id);
    return post.toPOJO();
  }

  @Get()
  public async index() {
    const posts = await this.postService.findAllPublished();
    return posts.map((p) => fillDto(PostRdo, p.toPOJO()));
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() dto: Partial<CreatePostDto>) {
    const post = await this.postService.update(id, dto, 'user-id-1');
    return fillDto(PostRdo, post.toPOJO());
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.postService.delete(id, 'user-id-1');
    return { message: 'Post deleted successfully' };
  }

  @Post(':id/repost')
  public async repost(@Param('id') id: string) {
    const post = await this.postService.repost(id, 'user-id-1');
    return fillDto(PostRdo, post.toPOJO());
  }
}
