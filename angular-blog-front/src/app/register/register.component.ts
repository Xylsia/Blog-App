import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
        this.router.navigateByUrl('/home');
    }
     else {
      this.router.navigateByUrl('/register');
    }
  }

  onRegister(user): void {
    console.log(user);
    this.subscriptions.push(
    this.userService.register(user).subscribe(
      response => {
        this.snackBar.open("Registered successfuly!", "", {duration: 3000});
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        const errorMsg: string = error.error;
        if (errorMsg === 'usernameExists') {
          this.snackBar.open("Username already exists!", "", {duration: 3000});
        } else if (errorMsg === 'emailExists') {
          this.snackBar.open("Email already exists!", "", {duration: 3000});
        } else {
          this.snackBar.open("Something went wrong, try again.", "", {duration: 3000});
        }
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
