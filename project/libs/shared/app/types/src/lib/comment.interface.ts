export interface Comment {
  id?: string;
  postId?: string;
  message: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
