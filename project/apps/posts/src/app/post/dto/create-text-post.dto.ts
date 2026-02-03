import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { CreatePostBaseDto } from './create-post-base.dto';
import { PostType } from '@project/shared/app/types';

export class CreateTextPostDto extends CreatePostBaseDto {
  @ApiProperty({ description: 'Post type', example: PostType.TEXT })
  override type: PostType.TEXT = PostType.TEXT;

  @ApiProperty({ description: 'Text title', minLength: 20, maxLength: 50 })
  @IsString()
  @Length(20, 50)
  title: string;

  @ApiProperty({ description: 'Announcement text', minLength: 50, maxLength: 255 })
  @IsString()
  @Length(50, 255)
  announcement: string;

  @ApiProperty({ description: 'Full content', minLength: 100, maxLength: 1024 })
  @IsString()
  @Length(100, 1024)
  content: string;
}
