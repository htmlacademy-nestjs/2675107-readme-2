import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/app/types';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePostBaseDto {
  @ApiProperty({
    description: 'Type of the post',
    enum: PostType,
    example: PostType.TEXT,
  })
  @IsEnum(PostType)
  type: PostType;

  @ApiProperty({
    description: 'Optional published date',
    required: false,
    type: String,
    example: '2026-01-29T12:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @ApiProperty({
    description: 'Post tags',
    required: false,
    type: [String],
    example: ['nestjs', 'backend'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
