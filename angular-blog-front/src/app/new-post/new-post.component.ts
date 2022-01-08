import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../model/post';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model/user';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  user: User;
  userName: string;
  host: string;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.host = this.postService.host;
    if (this.userService.isLoggedIn()) {
      this.userName = this.userService.loginUsername;
      this.getUserInfo(this.userName);
    }
  }

  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.userService.getUserInformation(username).subscribe(
      (response: User) => {
        this.user = response;
      }));
  }

  onNewPost(post: Post): void {
    console.log(post);
    this.subscriptions.push(
    this.postService.savePost(post).subscribe(
      response => {
        this.snackBar.open("Posted successfully!", "", {duration: 3000});
        console.log(response);
      },
      error => {
          this.snackBar.open("Something went wrong, try again.", "", {duration: 3000});
        }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
