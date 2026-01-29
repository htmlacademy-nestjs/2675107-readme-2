import { IsString} from "class-validator";
import { CreatePostBaseDto } from "./create-post-base.dto";
import { PostType } from "@project/shared/app/types";

export class CreateQuotePostDto extends CreatePostBaseDto {
  override type: PostType.QUOTE = PostType.QUOTE;

  @IsString()
  quote: string;

  @IsString()
  quoteAuthor: string;
}
