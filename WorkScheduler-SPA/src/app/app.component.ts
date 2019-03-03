import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  $isLoggedIn: Observable<boolean>;
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authenticate();
    this.$isLoggedIn = this.authService.isLoggedIn;
  }
}
