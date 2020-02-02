import { IUser } from './../models/IUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public list() {
    return this.http.get('users');
  }

  public create(user: IUser) {
    return this.http.post('users', user);
  }

  public edit(user: IUser, id: string) {
    return this.http.put(`users/${id}`, user);
  }

  public getUserById(id: string) {
    return this.http.get(`users/${id}`);
  }

  public delete(id: string) {
    return this.http.delete(`users/${id}`);
  }
}
