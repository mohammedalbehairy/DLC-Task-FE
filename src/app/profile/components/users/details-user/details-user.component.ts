import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  userId: string = '';
  user = null;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {

  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    },
      err => {
        console.log(err);
      })
    this.getDetails();
  }

  getDetails() {
    this.usersService.getUserById(this.userId).subscribe(data => {
      console.log(data);
      this.user = data;
    },
      err => {
        console.log(err);
      })
  }

}
