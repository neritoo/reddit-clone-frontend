import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://reddit-clone-apirest.herokuapp.com/api';
   }

   postComment(comment: Comment): Observable<Comment> {
     return this.http.post(`${this.url}/comments`, comment).pipe(
       map(response => response as Comment)
     );
   }

   getAllCommentsForPost(postId: number): Observable<Comment[]> {
     return this.http.get(`${this.url}/comments/post/${postId}`).pipe(
       map(response => response as Comment[])
     );
   }

   getAllCommentsForUser(username: string): Observable<Comment[]> {
     return this.http.get(`${this.url}/comments/user/${username}`).pipe(
       map(response => response as Comment[])
     );
   }
}
