import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Subreddit } from './subreddit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  url: string = 'https://reddit-clone-apirest.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Subreddit[]> {
    return this.http.get(`${this.url}/subreddit`).pipe(
      map(response => response as Subreddit[])
    )
  }

  getSubreddit(id: number): Observable<Subreddit> {
    return this.http.get(`${this.url}/subreddit/${id}`).pipe(
      map(response => response as Subreddit)
    );
  }

  createSubreddit(subreddit: Subreddit): Observable<Subreddit> {
    return this.http.post(`${this.url}/subreddit`, subreddit).pipe(
      map(response => response as Subreddit)
    );
  }


}
