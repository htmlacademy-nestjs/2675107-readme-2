
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

export interface PostMeta {
  id?: string;

  type: PostType;
  status: PostStatus;

  authorId: string;
  originalAuthorId?: string;
  originalPostId?: string;
  isRepost: boolean;

  tags: string[];

  likesCount: number;
  commentsCount: number;

  createdAt?: Date;
  publishedAt?: Date;

  data?: PostPhoto | PostText | PostVideo | PostQuote | PostLink | null;
}

export interface PostVideo {
  postId: string;
  title: string;
  videoUrl: string;
}

export interface PostText {
  postId: string;
  title: string;
  announcement: string;
  content: string;
}

export interface PostQuote {
  postId: string;
  quote: string;
  quoteAuthor: string;
}

export interface PostPhoto {
  postId: string;
  photoUrl: string;
}


export interface PostLink {
  postId: string;
  linkUrl: string;
  linkDescription?: string;
}

