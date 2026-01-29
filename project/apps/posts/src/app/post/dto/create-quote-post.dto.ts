import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreatePostBaseDto } from './create-post-base.dto';
import { PostType } from '@project/shared/app/types';

export class CreateQuotePostDto extends CreatePostBaseDto {
  @ApiProperty({ description: 'Post type', example: PostType.QUOTE })
  override type: PostType.QUOTE = PostType.QUOTE;

  @ApiProperty({ description: 'Quote text' })
  @IsString()
  quote: string;

  @ApiProperty({ description: 'Author of the quote' })
  @IsString()
  quoteAuthor: string;
}
