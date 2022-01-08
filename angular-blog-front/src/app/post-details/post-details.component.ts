import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { PostService } from '../service/post.service';
import { User } from '../model/user';
import { Post } from '../model/post';
import { Comment } from '../model/comment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  user = new User();
  userName: string;
  comment: Comment = new Comment();
  commentList: Array<object> = [];
  post: Post = new Post();
  like: string;
  color: string;
  postId: number;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.comment.content = ''; 

    this.route.params.subscribe(params => {
      this.postId = params.postId;
      console.log(params.postId);
      this.getUserInfo(this.userService.loginUsername);
    });
    this.getOnePost();
  }

  getOnePost(){
    this.postService.getOnePostById(this.postId).subscribe((data: Post) => {
      this.post = data;
      console.log(data);
     }, error => {
      this.snackBar.open("nope...", "", {duration: 2000});
     }
     )
  }

  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.userService.getUserInformation(username).subscribe(
      (response: User) => {
        this.user = response;
        console.log(response);
        this.displayLike(response);
      }));
  }

  getUserProfile(username: string): void {
    this.router.navigate(['/profile', username]);
    console.log(username);
  }

  onAddComment(comment, post: Post) {
    this.comment.content = '';
    const newComment: Comment = new Comment();
    newComment.content = comment.value.content;
    newComment.postId = comment.value.postId;
    newComment.postedDate = new Date();
    newComment.username = comment.value.username;
    post.commentList.push(newComment);
    this.subscriptions.push(
      this.postService.saveComment(newComment).subscribe(
        response => {
          console.log(response);
          console.log(newComment.content);
          console.log(newComment.postId);
          console.log(newComment.postedDate);
          console.log(newComment.username);
          this.snackBar.open("Comment Saved!", "", {duration: 3000});
        },
        error => {
          this.snackBar.open("Something went wrong, try again.", "", {duration: 3000});
        }
      )
    );
  }

  displayLike(user: User) {
    const result: Post = user.likedPost.find(post => post.id === this.post.id);
    if (result) {
      this.like = 'Unlike';
      this.color = '#18BC9C';
      console.log('testing');
    } else {
      this.like = 'Like';
      this.color = '#000000';
    }
  }

  likePost(post, user) {
    if (this.color === '#000000') {
      this.color = '#18BC9C';
      this.like = 'Unlike';
      this.doLike(post, user);
      post.likes += 1;
    } 
    else {
      this.color = '#000000';
      this.like = 'Like';
      this.doUnlike(post, user);
      if (user.likedPosts != null) {
        for (let i = 0; i < user.likedPosts.length; i++) {
          if (user.likedPosts[i].id === post.id) {
            user.likedPosts.splice(i, 1);
          }
        }
      }
      if (post.likes > 0) {
        this.post.likes -= 1;
      }
    }
  }

  doLike(post, user) {
    this.subscriptions.push(
      this.postService.like(post.id, user.username).subscribe(
        response => {
          this.snackBar.open("Post has been liked.", "", {duration: 3000});
        },
        error => {
          this.snackBar.open("Something went wrong, try again.", "", {duration: 3000});
        }
      )
    );
  }

  doUnlike(post, user) {
    this.subscriptions.push(
      this.postService.unlike(post.id, user.username).subscribe(
        response => {
          this.snackBar.open("Post has been unliked", "", {duration: 3000});
        },
        error => {
          this.snackBar.open("Something went wrong, try again.", "", {duration: 3000});
        }
      )
    );
  }

}
