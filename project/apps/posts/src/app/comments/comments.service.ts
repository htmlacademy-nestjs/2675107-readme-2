import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from '../post/post.repository';
import { CANNOT_DELETE_OTHER_USERS_COMMENT, COMMENTS_NOT_FOUND, MAX_COMMENTS_LIMIT } from './comments.constant';

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

  public async delete(commentId: string, userId: string) {
    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new NotFoundException(COMMENTS_NOT_FOUND);
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException(CANNOT_DELETE_OTHER_USERS_COMMENT);
    }

    await this.commentsRepository.deleteById(commentId);
  }
}
