import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private userService: UserService) {}
  user!: User;
  token!: Token;
  response: any;
  errorMessage!:string

  userForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  register() {
    this.user = new User('', '', '');
    this.user.email = this.userForm.value.email;
    this.user.username = this.userForm.value.username;
    this.user.password = this.userForm.value.password;
    console.log('Sending this', this.user);
    this.userService.register(this.user).subscribe({
      next: (res:any) => {
        console.log('Reponse here', res.message);
        this.response = res;
      },
      error: (error) => {
        console.log('Error here', error);
        this.errorMessage = error.error.message;
      },
      complete: () => {},
    });
  }
}
