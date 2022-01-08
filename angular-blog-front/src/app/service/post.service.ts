import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public host = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  savePost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.host}/post/save`, post);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.host}/post/list`);
  }

  getOnePostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.host}/post/getPostById/${postId}`);
  }

  getPostsByUsername(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.host}/post/getPostByUsername/${username}`);
  }

  saveComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.host}/post/comment/add`, comment);
  }

  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(`${this.host}/post/delete/${postId}`);
  }

  like(postId: number, username: string) {
    return this.http.post(`${this.host}/post/like/`, { postId, username });
  }

  unlike(postId: number, username: string) {
    return this.http.post(`${this.host}/post/unlike/`, { postId, username });
}

}
