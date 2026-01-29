import { IsString, IsUrl, Length } from 'class-validator';
import { CreatePostBaseDto } from './create-post-base.dto';
import { PostType } from '@project/shared/app/types';

export class CreateVideoPostDto extends CreatePostBaseDto {

  override type: PostType.VIDEO = PostType.VIDEO;

  @IsString()
  @Length(20, 50)
  title: string;

  @IsUrl()
  videoUrl: string;
}
