import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Length } from 'class-validator';
import { CreatePostBaseDto } from './create-post-base.dto';
import { PostType } from '@project/shared/app/types';

export class CreateVideoPostDto extends CreatePostBaseDto {
  @ApiProperty({ description: 'Post type', example: PostType.VIDEO })
  override type: PostType.VIDEO = PostType.VIDEO;

  @ApiProperty({ description: 'Video title', minLength: 20, maxLength: 50 })
  @IsString()
  @Length(20, 50)
  title: string;

  @ApiProperty({ description: 'Video URL' })
  @IsUrl()
  videoUrl: string;
}
