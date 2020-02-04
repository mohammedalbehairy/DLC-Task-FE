import { GeneralService } from './../../services/general.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId: string = '';
  user = null;
  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService
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
    this.generalService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    },
      err => {
        console.log(err);
      })
  }
}
