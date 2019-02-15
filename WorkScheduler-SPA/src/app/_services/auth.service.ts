import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
    baseUrl = 'http://localhost:5000/api/auth/';
    private loggedIn = new BehaviorSubject<boolean>(false);

constructor(private http: HttpClient) { }

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
}
