import { ToastrService } from 'ngx-toastr';
import { PostsService } from './../../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  posts = [];
  constructor(
    private postsService: PostsService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(searchWord?) {
    this.postsService.list(searchWord).subscribe((data: any) => {
      console.log(data);
      this.posts = data;
    }, (err => {
      console.log(err);
    }))
  }

  delete(id: string) {
    this.postsService.delete(id).subscribe(
      data => {
        this.getAll();
        this.toastr.success('Post Deleted Successfully', 'Success');
      },
      err => {
        console.log(err);
      })
  }

  search(searchWord) {
    this.getAll(searchWord.value);
  }

  reset(searchWord) {
    searchWord.value = '';
    this.getAll();
  }
  
}
