import { PostsService } from './../../../services/posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  postId: string = '';
  post = null;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
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
    this.postsService.getDetails(this.postId).subscribe(data => {
      console.log(data);
      this.post = data;
    },
      err => {
        console.log(err);
      })
  }

}
