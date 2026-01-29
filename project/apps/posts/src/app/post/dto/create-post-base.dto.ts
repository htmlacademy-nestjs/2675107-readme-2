import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/app/types';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePostBaseDto  {
  @IsEnum(PostType)
  type: PostType;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @ApiProperty({
    description: 'Post tags',
    example: ['nestjs', 'backend'],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
