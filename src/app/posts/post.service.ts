import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { PostRequest } from './post-request';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: string = 'https://reddit-clone-apirest.herokuapp.com/api/posts';
  urlLocal: string = 'http://localhost:8080/api/posts'
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllPosts(): Observable<Array<Post>> {
    
    return this.http.get(`${this.url}`).pipe(
      map(res => res as Post[]
        ));
  }

  getAllPostsByUser(username: string): Observable<Post[]> {
    return this.http.get(`${this.url}/username/${username}`).pipe(
      map(response => response as Post[])
    );
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get(`${this.url}/${postId}`).pipe(
      map(reponse => reponse as Post)
    );
  }

  createPost(postRequest: PostRequest): Observable<Post> {
    return this.http.post(`${this.url}`, postRequest).pipe(
      map(response => response as Post)
    );
  }

}
