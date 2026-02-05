export interface User {
  id?: string;
  email: string;
  name: string;
  avatar?: string;

  postsCount: number;
  likes: number,
  followers: number,
  following: number

  dateRegistry: Date
}
