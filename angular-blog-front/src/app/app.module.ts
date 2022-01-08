import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SafePipeModule } from 'safe-pipe';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewPostComponent } from './new-post/new-post.component';

import { UserService } from './service/user.service';
import { PostService } from './service/post.service';
import { AuthenticationGuard } from './guard/authentication.guard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    PostDetailsComponent,
    NewPostComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    SafePipeModule
  ],
  providers: [
    UserService,
    PostService,
    AuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
