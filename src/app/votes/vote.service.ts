import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vote } from './vote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://reddit-clone-apirest.herokuapp.com/api/votes';
  }

  vote(vote: Vote): Observable<any> {
    return this.http.post(`${this.url}`, vote);
  }
}
