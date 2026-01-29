import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';
import { CreatePostBaseDto } from './create-post-base.dto';
import { PostType } from '@project/shared/app/types';

export class CreateLinkPostDto extends CreatePostBaseDto {
  @ApiProperty({ description: 'Post type', example: PostType.LINK })
  override type: PostType.LINK = PostType.LINK;

  @ApiProperty({ description: 'URL of the link' })
  @IsUrl()
  linkUrl: string;

  @ApiProperty({ description: 'Description of the link' })
  @IsString()
  linkDescription: string;
}
