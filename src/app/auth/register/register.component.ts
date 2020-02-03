import { IUserRegister } from './../models/IUserRegister';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  public registerForm: FormGroup;
  public isSubmitted = false;
  public errorMessage = null;

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  register() {

    this.errorMessage = null;
    if (this.registerForm.invalid) {

      return;
    }
    this.isSubmitted = true;
    const userRegisterData: IUserRegister = {
      email: this.email.value,
      username: this.username.value,
      password: this.password.value
    };

    this.authService.register(userRegisterData).subscribe(
      (result) => {
        this.authService.setToken(result.bearer);
        this.authService.setInfo(result.username, result.email, result.isAdmin);
        this.authService.notifySubscribers(true);
        this.router.navigate(['/admin/list']).then().catch();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSubmitted = false;
      }
    );
  }

}
