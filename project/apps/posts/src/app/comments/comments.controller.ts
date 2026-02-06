import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({ status: 201 })
  @Post(':postId')
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() dto: CreateCommentDto,
    @Param('postId') postId: string,
    @Query('userId') userId: string,
  ) {
    return this.commentsService.create(dto, postId, userId);
  }

  @Get()
  public async index(
    @Query('postId') postId: string,
    @Query('page') page?: string,
  ) {
    return this.commentsService.findCommentsForPost(
      postId,
      Number(page) || 0,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    await this.commentsService.delete(id, userId);
  }
}
