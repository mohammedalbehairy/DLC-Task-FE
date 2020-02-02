import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/admin/auth/login'])
  }

  get username() {
    return localStorage.getItem('username');
  }

  get role() {
    return localStorage.getItem('isAdmin');
  }
}
