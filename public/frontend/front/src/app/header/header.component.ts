import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  token!: any;

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
  }

  logout() {
    this.route.navigate(['/movies']).then(() => {
      this.authService.logout();
      window.location.reload();
    });
  }
}
