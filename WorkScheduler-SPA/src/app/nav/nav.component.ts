import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
