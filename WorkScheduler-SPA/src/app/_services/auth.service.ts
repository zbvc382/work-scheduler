import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService implements OnInit {
    baseUrl = 'http://localhost:5000/api/auth/';
    loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    login(model: any) {
        return this.http.post(this.baseUrl + 'login', model)
            .pipe(
                map((response: any) => {
                    const user = response;
                    if (user) {
                        localStorage.setItem('token', user.token);
                        this.loggedIn.next(true);
                    }
                })
            );
    }
    logout() {
        localStorage.removeItem('token');
        this.loggedIn.next(false);
    }

}
