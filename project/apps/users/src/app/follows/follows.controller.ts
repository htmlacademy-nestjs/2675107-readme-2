import { Controller, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FollowsService } from './follows.service';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { MongoIdValidationPipe } from '@project/shared/core/shared-pipes';


@ApiTags('follows')
@Controller('follow')
export class FollowsController {
    constructor(
    private readonly followsService: FollowsService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @UseGuards(JwtAuthGuard)
  @Post('follow-user/:followindId')
  public async create(@Req() req, @Param('followindId', MongoIdValidationPipe) followingId: string) {
    const userId = req.user.sub;

    await this.followsService.followUser(userId, followingId)

    return { message: 'Follow successfully' };
  }

}
