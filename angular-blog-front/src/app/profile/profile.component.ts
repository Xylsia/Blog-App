import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { PostService } from '../service/post.service';
import { Post } from '../model/post';
import { User } from '../model/user'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  posts: Post = new Post();
  user: User;
  host: string;
  username: string;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private postService: PostService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.host = this.postService.host;
    this.getUserInfo(this.username);
  }

  getPostsByUsername(username: string): void {
    this.subscriptions.push(
      this.postService.getPostsByUsername(username).subscribe(
        (response: Post[]) => {
          this.user.post = response;
          console.log(response);
        },
        error => {
          console.log(error);
          this.user.post = null;
        }
      )
    );
  }

  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.userService.getUserInformation(username).subscribe(
        (response: User) => {
          this.user = response;
          this.getPostsByUsername(this.user.username);
        }
      ));
  }

  onUpdateUser(updatedUser: User): void {
    this.subscriptions.push(
      this.userService.updateUser(updatedUser).subscribe(
        response => {
          this.snackBar.open("User updated successfully!", "", {duration: 3000});
        },
        error => {
          this.snackBar.open("Something went wrong, try again.", "", {duration: 3000});
        }
      )
    );
  }

  onDeleteUser(username: string): void{ 
    this.subscriptions.push(
      this.userService.deleteUser(username).subscribe(
        response => {
          this.snackBar.open("Your account has been deleted", "", {duration: 3000});
          this.userService.logOut();
          this.router.navigateByUrl('/login');
        },
        error => {
          this.snackBar.open("Something went wrong, try again.", "", {duration: 3000});
        }
      )
    );
  }

  onDeletePost(id: number) {
    this.subscriptions.push(
      this.postService.deletePost(id).subscribe(
        response => {
          this.snackBar.open("Post was deleted", "", {duration: 3000});
        },
        error => {
          this.snackBar.open("Something went wrong, try again.", "", {duration: 3000});
        }
      )
    );
  }

  seeOnePost(postId): void {
    this.router.navigate(['/post', postId]);
    console.log(postId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
