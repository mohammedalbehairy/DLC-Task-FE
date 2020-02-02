import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postId: string = '';
  post = null;
  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService
  ) {

  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.postId = params['id'];
    },
      err => {
        console.log(err);
      })
    this.getDetails();
  }

  getDetails() {
    this.generalService.getPostById(this.postId).subscribe(data => {
      console.log(data);
      this.post = data;
    },
      err => {
        console.log(err);
      })
  }
}
