export interface User {
  id?: string;
  email: string;
  name: string;
  avatar?: string;

  postsCount: number;
  followers: number,
  following: number

  dateRegistry: Date
}
