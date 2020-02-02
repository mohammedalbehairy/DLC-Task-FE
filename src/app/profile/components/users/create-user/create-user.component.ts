import { IUser } from './../../../models/IUser';
import { UsersService } from './../../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  public createForm: FormGroup;
  public isSubmitted = false;
  public errorMessage = null;

  categories = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      isAdmin: new FormControl(false, [Validators.required])
    });

  }

  createUser() {
    console.log(this.createForm);
    this.errorMessage = null;
    if (this.createForm.invalid) {
      this.errorMessage = 'Invalid Data';
      return;
    }
    this.isSubmitted = true;
    const userData: IUser = {
      username: this.username.value,
      email: this.email.value,
      isAdmin: this.isAdmin.value,
      password: this.password.value
    };

    this.usersService.create(userData).subscribe(
      (result) => {
        this.toastr.success('User Created Successfully', 'Success');

        this.router.navigate(['admin/list-users'])
      },
      (err) => {
        this.errorMessage = err;
        this.isSubmitted = false;
      }
    );
  }

  get username() {
    return this.createForm.get('username');
  }

  get email() {
    return this.createForm.get('email');
  }

  get password() {
    return this.createForm.get('password');
  }
  get isAdmin() {
    return this.createForm.get('isAdmin');
  }


}
