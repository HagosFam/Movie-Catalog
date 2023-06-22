import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment.development';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userBaseUrl = environment.userApiUrl;
  tokens!: Token;
  username!: string;

  constructor(private _http: HttpClient) {}

  register(user: User): Observable<User> {
    return this._http.post<User>(this.userBaseUrl + 'register', user.toJson());
  }

  login(login: Login): Observable<string> {
    return this._http.post<string>(this.userBaseUrl + 'login', login.toJson());
  }

  set token(token: Token) {
    this.tokens = token;
  }

  get token(): Token {
    return this.tokens;
  }

  public setLoggedUser(user: string) {
    this.username = user;
  }

  get getLoggedUser(): string {
    return this.username;
  }
}
