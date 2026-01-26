import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/app/types';

export class CreatePostDto {
  type: PostType;

  @ApiProperty({
    description: 'Post title',
    example: 'How to learn NestJS'
  })
  title?: string;
  announcement?: string;
  @ApiProperty({
    description: 'Post content',
    example: 'NestJS is a progressive Node.js framework...'
  })
  content?: string;
  quoteAuthor?: string;
  videoUrl?: string;
  linkUrl?: string;
  linkDescription?: string;
  photoUrl?: string;

  @ApiProperty({
    description: 'Post tags',
    example: ['nestjs', 'backend'],
    required: false
  })
  tags?: string[];
}
