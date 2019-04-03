import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService implements OnInit {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User = { id: '', username: '' };
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.authenticate();
        }
      })
    );
  }

  logout() {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
    this.loggedIn.next(false);
  }

  authenticate() {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.decodedToken = this.jwtHelper.decodeToken(
        localStorage.getItem('token')
      );
      this.currentUser.id = this.decodedToken.nameid;
      this.currentUser.username = this.decodedToken.unique_name;
      this.loggedIn.next(true);
    } else {
      this.logout();
    }
  }
}
