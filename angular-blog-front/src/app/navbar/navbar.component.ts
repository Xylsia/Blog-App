import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { PostService } from '../service/post.service';
import { User } from '../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  private subscriptions: Subscription[] = [];
  host: string;
  user: User;
  username: string;
  showNavbar: boolean;
  userLoggedIn: boolean;

  constructor(private router: Router, private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
    this.host = this.postService.host;
    if (this.userService.isLoggedIn()) {
      this.showNavbar = true;
      this.username = this.userService.loginUsername;
      this.getUserInfo(this.username);
    } 
    else {
      this.showNavbar = false;
    }
  }

  getUserProfile(username: string): void {
    this.router.navigate(['/profile', username]);
  }

  getUserInfo(username: string): void {
    this.subscriptions.push(
      this.userService.getUserInformation(username).subscribe(
      (response: User) => {
        this.user = response;
        this.userLoggedIn = true;
        this.showNavbar = true;
      },
      error => {
        console.log(error);
        this.userLoggedIn = false;
      }
    ));
  }

  logOut(): void {
    this.userService.logOut();
    window.location.href="/login";
  }


}
