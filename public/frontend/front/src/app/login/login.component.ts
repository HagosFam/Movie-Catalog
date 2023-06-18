import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Token } from '../models/Token';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: Login;
  token!:string;
  user!:User

  constructor(private _userService: UserService, private _authService:AuthService) {}

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
      next: (res) => {
        let result:string = res
        console.log("Returned after login", result)
      //  console.log("Returned after login", res.user.username)
        this._authService.setToken(result);         
      },
      error: (error) => {
        console.log('Error happened', error);
      },
      complete: () => {},
    });
  }
}
