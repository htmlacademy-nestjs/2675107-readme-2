
export enum PostStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}

export enum PostType {
  VIDEO = 'VIDEO',
  TEXT = 'TEXT',
  QUOTE = 'QUOTE',
  PHOTO = 'PHOTO',
  LINK = 'LINK',
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
