import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from './../../../services/users.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IUser } from './../../../models/IUser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  public editForm: FormGroup;
  public isSubmitted = false;
  public errorMessage = null;
  userId: string = '';

  categories = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    })

    this.editForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      isAdmin: new FormControl(false, [Validators.required])
    });
    this.getUser();
  }

  editUser() {
    this.errorMessage = null;
    if (this.editForm.invalid) {
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

    this.usersService.edit(userData, this.userId).subscribe(
      (result) => {
        this.toastr.success('User Updated Successfully', 'Success');

        this.router.navigate(['admin/list-users'])
      },
      (err) => {
        this.errorMessage = err;
        this.isSubmitted = false;
      }
    );
  }

  getUser() {
    this.usersService.getUserById(this.userId).subscribe(
      (user: any) => {
        this.username.setValue(user.username);
        this.email.setValue(user.email);
        this.isAdmin.setValue(user.isAdmin);
      },
      err => {
        console.log(err);
      }
    )
  }

  get username() {
    return this.editForm.get('username');
  }

  get email() {
    return this.editForm.get('email');
  }

  get password() {
    return this.editForm.get('password');
  }
  get isAdmin() {
    return this.editForm.get('isAdmin');
  }

}
