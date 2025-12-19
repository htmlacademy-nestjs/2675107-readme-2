export interface User {
  id?: string;
  email: string;
  name: string;

  postsCount: number;
  likes: number,
  followers: number,
  following: number

  dateRegistry: Date
}
