import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
