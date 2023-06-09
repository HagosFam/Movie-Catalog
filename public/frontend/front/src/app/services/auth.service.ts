import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null{
    return localStorage.getItem('token')
  }

  logout() {
    localStorage.removeItem('token');
  }
}
