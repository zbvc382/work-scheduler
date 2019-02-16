import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  subscription: Subscription;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/home']);
      }
    });
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      .subscribe(next => {
        console.log('login successfull');
      }, error => {
        console.log('login failed');
      }, () => {
        this.router.navigate(['/home']);
      });
    }
  }
}
