import { IsString, IsUrl } from "class-validator";
import { CreatePostBaseDto } from "./create-post-base.dto";
import { PostType } from "@project/shared/app/types";

export class CreateLinkPostDto extends CreatePostBaseDto {
  override type: PostType.LINK = PostType.LINK;

  @IsUrl()
  linkUrl: string;

  @IsString()
  linkDescription: string;
}
