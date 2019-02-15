import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        children: [
            { path: 'login', component: LoginComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
