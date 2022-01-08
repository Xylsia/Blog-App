import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guard/authentication.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';


const route: Routes = [ 
    { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'post/:postId', component: PostDetailsComponent, canActivate: [AuthenticationGuard] },
    { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthenticationGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'new-post', component: NewPostComponent, canActivate: [AuthenticationGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(route)
    ],

    exports:[
        RouterModule
    ]
})

export class RoutingModule {}