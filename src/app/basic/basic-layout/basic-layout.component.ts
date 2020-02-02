import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.css']
})
export class BasicLayoutComponent implements OnInit {
  isAuth = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkIsAuth();
  }

  checkIsAuth() {
    this.isAuth = this.authService.isAuth();
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/auth/login'])
  }

  goToDashboard() {
    this.router.navigate(['/admin/list-users'])
  }
}
