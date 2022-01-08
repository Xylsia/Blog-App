import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public token: string;
  public loginUsername: string;
  public redirectUrl: string;
  private jwtHelper = new JwtHelperService();
  public host = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<HttpErrorResponse | HttpResponse<any>>  {
    return this.http.post<HttpErrorResponse | HttpResponse<any>>(`${this.host}/user/login`, user, { observe: 'response' });
  }

  register(user: User): Observable<User | HttpErrorResponse>  {
    return this.http.post<User>(`${this.host}/user/register`, user);
  }

  getUserInformation(username: string): Observable<User> {
    return this.http.get<User>(`${this.host}/user/${username}`);
  }

  searchUsers(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/findByUsername/${username}`);
  }

  updateUser(updateUser: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, updateUser);
  }

  deleteUser(username: string): Observable<User> {
    return this.http.delete<User>(`${this.host}/user/delete/${username}`);
  }

  logOut(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  getToken(): string {
   return this.token;
  }

  isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loginUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } 
    else {
      this.logOut();
      return false;
    }
  }


}
