import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { fillDto } from '@project/shared/helpers';
import { PostRdo } from './rdo/post.rdo';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Post created',
    type: PostRdo,
  })
  @Post()
  public async create(@Body() dto: CreatePostDto) {
    const post = await this.postService.create(dto, 'author-id-1');
    return fillDto(PostRdo, post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: PostRdo,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.findById(id);
    return fillDto(PostRdo, post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: [PostRdo],
  })
  @Get()
  public async index() {
    const posts = await this.postService.findAll();
    return posts.map((post) => fillDto(PostRdo, post.toPOJO()));
  }
}
