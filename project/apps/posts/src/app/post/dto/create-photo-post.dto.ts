import { IsUrl } from "class-validator";
import { CreatePostBaseDto } from "./create-post-base.dto";
import { PostType } from "@project/shared/app/types";

export class CreatePhotoPostDto extends CreatePostBaseDto {
  override type: PostType.PHOTO = PostType.PHOTO;

  @IsUrl()
  photoUrl: string;

}
