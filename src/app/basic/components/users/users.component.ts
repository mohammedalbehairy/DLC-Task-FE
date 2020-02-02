import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];
  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.generalService.listUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    }, (err => {
      console.log(err);
    }))
  }

}
