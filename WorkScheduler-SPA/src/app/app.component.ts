import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.authService.loggedIn.next(true);
    }
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
