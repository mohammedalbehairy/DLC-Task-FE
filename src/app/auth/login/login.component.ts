import { AuthService } from './../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserLogin } from './../../shared/IUserLogin';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  public loginForm: FormGroup;
  public isSubmitted = false;
  public errorMessage = null;
  public returnTo: string;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.returnTo = params['return'] || '/admin/list-posts';
    });
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    
    this.errorMessage = null;
    if (this.loginForm.invalid) {
      this.errorMessage = 'Invalid Username or/and password';
      return;
    }
    this.isSubmitted = true;
    const userLogInData: IUserLogin = {
      email: this.email.value,
      password: this.password.value
    };

    this.authService.login(userLogInData).subscribe(
      (result) => {
        this.authService.setToken(result.bearer);
        this.authService.setInfo(result.username, result.email, result.isAdmin);
        this.authService.notifySubscribers(true);
        this.router.navigate([this.returnTo]).then().catch();
      },
      (err) => {
        this.errorMessage = 'Invalid Username or/and password';
        this.isSubmitted = false;
      }
    );
  }
}
