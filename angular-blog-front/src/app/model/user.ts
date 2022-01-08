import { Post } from './post';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  imageUrl: string;
  post: Post[];
  likedPost: Post[];
  createdDate: Date;
}