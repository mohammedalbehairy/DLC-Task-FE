import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  public listPosts() {
    return this.http.get('posts');
  }

  public getPostById(id: string) {
    return this.http.get(`posts/${id}`);
  }

  public listUsers() {
    return this.http.get('users');
  }

  public getUserById(id: string) {
    return this.http.get(`users/${id}`);
  }
}
