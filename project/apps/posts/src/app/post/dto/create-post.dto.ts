import { CreateLinkPostDto } from "./create-link-post.dto";
import { CreatePhotoPostDto } from "./create-photo-post.dto";
import { CreateQuotePostDto } from "./create-quote-post.dto";
import { CreateTextPostDto } from "./create-text-post.dto";
import { CreateVideoPostDto } from "./create-video-post.dto";

export type CreatePostDto =
  | CreateVideoPostDto
  | CreateTextPostDto
  | CreateQuotePostDto
  | CreatePhotoPostDto
  | CreateLinkPostDto;
