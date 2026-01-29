import { IsString, Length } from "class-validator";
import { CreatePostBaseDto } from "./create-post-base.dto";
import { PostType } from "@project/shared/app/types";

export class CreateTextPostDto extends CreatePostBaseDto {
  override type: PostType.TEXT = PostType.TEXT;

  @IsString()
  @Length(20, 50)
  title: string;

  @IsString()
  @Length(50, 255)
  announcement: string;

  @IsString()
  @Length(100, 1024)
  content: string;
}
