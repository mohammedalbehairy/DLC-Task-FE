import { IPost } from './../models/IPost';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  public list(bodyWords?: string) {
    const params = new HttpParams().set('bodyWords', bodyWords);
    return this.http.get('posts/my-posts',{params});
  }

  public getDetails(id: string) {
    return this.http.get(`posts/${id}`);
  }

  public create(post: IPost) {
    return this.http.post('posts', post);
  }

  public edit(postId: string, post: IPost) {
    return this.http.put(`posts/${postId}`, post);
  }

  public delete(id: string) {
    return this.http.delete(`posts/${id}`);
  }

  public listCategories() {
    return this.http.get(`categories`);
  }

}
