import { ToastrService } from 'ngx-toastr';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users = [];
  constructor(
    private usersService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(searchEmail?) {
    console.log(searchEmail);
    
    this.usersService.list(searchEmail).subscribe((data: any) => {
      console.log(data);
      this.users = data;
    }, (err => {
      console.log(err);
    }))
  }

  delete(id: string) {
    this.usersService.delete(id).subscribe(
      data => {
        this.getAll();
        this.toastr.success('User Deleted Successfully', 'Success');
      },
      err => {
        console.log(err);

      })
  }
  get email() {
    return localStorage.getItem('email');
  }

  search(searchEmail) {
    this.getAll(searchEmail.value);
  }

  reset(searchEmail) {
    searchEmail.value = '';
    this.getAll();
  }
}
