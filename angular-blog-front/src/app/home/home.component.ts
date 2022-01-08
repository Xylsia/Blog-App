import { Component, OnDestroy, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { PostService } from '../service/post.service';
import { Post } from '../model/post';
import { User } from '../model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  showNavbar: boolean;
  user: User;
  searchedUser: User[];
  posts: Post[] = [];
  host: string;
  username: string;

  constructor(private router: Router,
    private userService: UserService,
    private postService: PostService

  ) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.showNavbar = true;
      this.username = this.userService.loginUsername;
      this.getUserInfo(this.username);
    } 
    else {
      this.showNavbar = false;
    }

    this.getPosts();
    this.host = this.postService.host;
  }

  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.userService.getUserInformation(username).subscribe(
      (response: User) => {
        this.user = response;
      }));
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigateByUrl('/login');
  }

  getUserProfile(username: string): void {
    this.router.navigate(['/profile', username]);
    console.log(username);
  }

  getPosts(): void {
    this.subscriptions.push(this.postService.getPosts().subscribe(
      (response: Post[]) => {
        this.posts = response;

      }));
  }

  seeOnePost(postId): void {
    this.router.navigate(['/post', postId]);
  }

  onSearchUsers(event) {
    console.log(event);
    const username = event;
    this.subscriptions.push(this.userService.searchUsers(username).subscribe(
      (response: User[]) => {
        this.searchedUser = response;
      }));
  }

  getSearchUserProfile(username: string): void {
    const element: HTMLElement = document.getElementById('searchList') as HTMLElement;
    element.click();
    this.router.navigate(['/profile', username]);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



}
