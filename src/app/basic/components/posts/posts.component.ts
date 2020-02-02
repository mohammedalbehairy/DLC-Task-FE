import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts = [];
  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.generalService.listPosts().subscribe((data: any) => {
      console.log(data);
      this.posts = data;
    }, (err => {
      console.log(err);
    }))
  }
}
