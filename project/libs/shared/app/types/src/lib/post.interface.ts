
export enum PostType {
  VIDEO = 'video',
  TEXT = 'text',
  QUOTE = 'quote',
  PHOTO = 'photo',
  LINK = 'link',
}

export enum PostStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
}



export interface Post {
  id?: string;

  type: PostType;
  status: PostStatus;

  authorId: string;
  originalAuthorId?: string;
  originalPostId?: string;
  isRepost: boolean;

  title?: string;
  announcement?: string;
  content?: string;
  quoteAuthor?: string;
  videoUrl?: string;
  linkUrl?: string;
  linkDescription?: string;
  photoUrl?: string;

  tags: string[];

  likesCount: number;
  commentsCount: number;

  createdAt?: Date;
  publishedAt?: Date;
}
