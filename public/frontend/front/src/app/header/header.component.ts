import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  token!: any;
  loggedUser!:string;

  constructor(private authService: AuthService, private route: Router, private _userService:UserService) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
   this.loggedUser = this._userService.getLoggedUser;
   console.log(this.loggedUser);
   
  }

  logout() {
    this.route.navigate(['/movies']).then(() => {
      this.authService.logout();
      window.location.reload();
    });
  }
}
