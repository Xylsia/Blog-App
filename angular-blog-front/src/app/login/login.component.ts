import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy  {

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
        this.router.navigateByUrl('/home');
    }
     else {
      this.router.navigateByUrl('/login');
    }
  }

  onLogin(user: User): void {
    this.subscriptions.push(
      this.userService.login(user).subscribe(
        response => {
          const token: string = response.headers.get('Authorization');
          this.userService.saveToken(token);

            window.location.href="/home";
            this.snackBar.open("Logged in!", "", {duration: 3000});
        },
        error => {
          this.snackBar.open("Please try again!", "", {duration: 3000});
        }
        ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

}
