import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'How to learn NestJS'
  })
  public title: string;

  @ApiProperty({
    description: 'Post content',
    example: 'NestJS is a progressive Node.js framework...'
  })
  public content: string;

  @ApiProperty({
    description: 'Post tags',
    example: ['nestjs', 'backend'],
    required: false
  })
  public tags?: string[];
}
