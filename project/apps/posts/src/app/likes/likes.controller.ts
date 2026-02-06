import { Controller, Param, Post, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Лайк создан' })
  public async create(
    @Param('postId') postId: string,
    @Query('userId') userId: string,
  ) {
    return this.likesService.create(postId, userId);
  }

  @Delete(':postId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Лайк удалён' })
  public async delete(
    @Param('postId') postId: string,
    @Query('userId') userId: string,
  ) {
    await this.likesService.delete(postId, userId);
  }
}
