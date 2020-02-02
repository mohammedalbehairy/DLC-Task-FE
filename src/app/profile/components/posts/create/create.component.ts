import { ToastrService } from 'ngx-toastr';
import { IPost } from './../../../models/IPost';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './../../../services/posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public createForm: FormGroup;
  public isSubmitted = false;
  public errorMessage = null;

  categories = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      category: new FormControl('', [Validators.required]),
      body: new FormControl(null, [Validators.required])
    });
    this.getCategories();
  }

  createPost() {
    console.log(this.createForm);
    this.errorMessage = null;
    if (this.createForm.invalid) {
      this.errorMessage = 'Invalid Data';
      return;
    }
    this.isSubmitted = true;
    const postData: IPost = {
      title: this.title.value,
      body: this.body.value,
      categoryId: this.category.value
    };

    this.postsService.create(postData).subscribe(
      (result) => {
        this.toastr.success('Post Created Successfully', 'Success');

        this.router.navigate(['admin/list-posts'])
      },
      (err) => {
        this.errorMessage = err;
        this.isSubmitted = false;
      }
    );
  }

  getCategories() {
    this.postsService.listCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  get title() {
    return this.createForm.get('title');
  }

  get category() {
    return this.createForm.get('category');
  }

  get body() {
    return this.createForm.get('body');
  }

}
