import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) { }
  isAdmin = 'false';
  ngOnInit() {
    this.checkIsAdmin();
  }

  checkIsAdmin() {
    this.isAdmin = this.authService.isAdmin();
  }
}
