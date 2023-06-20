import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Token } from '../models/Token';
import { User } from '../models/user';
import { Route, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: Login;
  user!: User;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router,
    private _location: Location
  ) {}

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  ngOnInit() {}

  signin() {
    this.login = new Login('', '');
    this.login.username = this.loginForm.value.username;
    this.login.password = this.loginForm.value.password;
    console.log('login', this.login);
    this._userService.login(this.login).subscribe({
      next: (res: any) => {
      
        let jsonResponse = res;
        let response = jsonResponse.token;
        console.log("The returned value", jsonResponse.user.username)
        this._authService.setToken(response);
        this._router.navigate(['/movies']).then(()=>{
          window.location.reload();
        })
      },
      error: (error) => {
        console.log('Error happened', error);
      },
      complete: () => {},
    });
  }
}
