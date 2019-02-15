import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.redirectIfLoggedIn();
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  redirectIfLoggedIn() {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/home']);
      }
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
