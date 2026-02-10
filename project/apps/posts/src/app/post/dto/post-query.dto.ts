import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PostType } from '@project/shared/app/types';

export enum PostSort {
  DATE = 'publishedAt',
  COMMENTS = 'comments',
}

export class PostQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsEnum(PostSort)
  sort?: PostSort = PostSort.DATE;

  @IsOptional()
  @IsString()
  authorId?: string;

  @IsOptional()
  @IsEnum(PostType)
  type?: PostType;

  @IsOptional()
  @IsString()
  tag?: string;
}
