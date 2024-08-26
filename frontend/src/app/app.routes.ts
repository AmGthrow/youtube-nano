import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { VideosComponent } from './videos/videos.component';
import { VideouploadComponent } from './videoupload/videoupload.component';

export const routes: Routes = [
    {
        path: '',
        title: 'View Video',
        component: VideosComponent,
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        title: 'Signup',
        component: SignupComponent,
    },
    {
        path: 'upload',
        title: 'Upload Video',
        component: VideouploadComponent,
    }
];
