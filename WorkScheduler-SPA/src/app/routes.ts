import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: '',
        children: [
            { path: 'login', component: LoginComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
