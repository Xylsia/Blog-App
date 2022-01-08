import { Comment } from './comment';

export class Post {
  public id: number;
  public title: string;
  public content: string;
  public postedDate: Date;
  public username: string;
  public imageUrl: string;
  public likes: number;
  public commentList: Comment[];
}