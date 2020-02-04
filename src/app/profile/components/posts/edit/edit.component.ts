import { ToastrService } from 'ngx-toastr';
import { IPost } from './../../../models/IPost';
import { PostsService } from './../../../services/posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public editForm: FormGroup;
  public isSubmitted = false;
  public errorMessage = null;
  postId: string = '';
  categories = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.postId = params['id'];
    })
    this.editForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      category: new FormControl('', [Validators.required]),
      body: new FormControl(null, [Validators.required])
    });
    this.getCategories();
    this.getPost();
  }

  editPost() {
    this.errorMessage = null;
    if (this.editForm.invalid) {
      this.errorMessage = 'Invalid Data';
      return;
    }
    this.isSubmitted = true;
    const postData: IPost = {
      title: this.title.value,
      body: this.body.value,
      categoryId: this.category.value
    };

    this.postsService.edit(this.postId,postData).subscribe(
      (result) => {
        this.toastr.success('Post Updated Successfully', 'Success');

        this.router.navigate(['admin/list-posts'])
      },
      (err) => {
        this.errorMessage = err;
        this.isSubmitted = false;
      }
    );
  }

  getPost() {
    this.postsService.getDetails(this.postId).subscribe(
      (post: any) => {
        this.editForm.get('title').setValue(post.title);
        this.editForm.get('body').setValue(post.body);
        this.editForm.get('category').setValue(post.categoryId._id);
      },
      err => {
        console.log(err);
      }
    )
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
    return this.editForm.get('title');
  }

  get category() {
    return this.editForm.get('category');
  }

  get body() {
    return this.editForm.get('body');
  }

}
