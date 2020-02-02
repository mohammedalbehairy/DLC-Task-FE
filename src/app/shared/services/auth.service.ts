import { IUserRegister } from './../../auth/models/IUserRegister';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IUserLogin } from './../IUserLogin';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  public userStatus$ = new Subject<boolean>();

  public notifySubscribers(status: boolean) {
    this.userStatus$.next(status);
  }

  login(userLogin: IUserLogin): Observable<any> {
    return this.http.post('auth/login', userLogin);
  }

  register(userRegister: IUserRegister): Observable<any> {
    return this.http.post('auth/register', userRegister);
  }

  isAuth() {
    return localStorage.getItem('bearer') !== null;
  }

  isAdmin() {
    return localStorage.getItem('isAdmin');
  }

  logOut() {
    this.removeInfo();
    this.removeToken();
  }

  setToken(token: string): void {
    localStorage.setItem('bearer', token);
  }

  setInfo(username: string, email: string, isAdmin: boolean): void {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('isAdmin', String(isAdmin));
  }

  removeInfo(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('isAdmin');
  }

  removeToken(): void {
    localStorage.removeItem('bearer');
  }

  getToken(): string {
    return localStorage.getItem('bearer');
  }

}
