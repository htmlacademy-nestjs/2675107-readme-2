import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { CreatePostBaseDto } from './create-post-base.dto';
import { PostType } from '@project/shared/app/types';

export class CreatePhotoPostDto extends CreatePostBaseDto {
  @ApiProperty({ description: 'Post type', example: PostType.PHOTO })
  override type: PostType.PHOTO = PostType.PHOTO;

  @ApiProperty({ description: 'URL of the photo' })
  @IsUrl()
  photoUrl: string;
}
