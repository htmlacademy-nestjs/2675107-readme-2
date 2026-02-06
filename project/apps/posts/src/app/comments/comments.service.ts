import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from '../post/post.repository';
import { MAX_COMMENTS_LIMIT } from './comments.constant';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostRepository
  ) {}

  public async create(dto: CreateCommentDto, postId: string, authorId: string) {
    await this.postsRepository.findById(postId);

    return this.commentsRepository.createComment(dto, postId, authorId);
  }

  public async findCommentsForPost(
    postId: string,
    page: number,
  ) {
    const take = MAX_COMMENTS_LIMIT;
    const safePage = page < 1 ? 1 : page;
    const skip = (safePage - 1) * take;
    return this.commentsRepository.findByPostId(postId, take, skip);
  }

  public async delete(id: string, userId: string) {
    const comment = await this.commentsRepository.findById(id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('You can delete only your own comments');
    }

    await this.commentsRepository.deleteById(id);
  }
}
