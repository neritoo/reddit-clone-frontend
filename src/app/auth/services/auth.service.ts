import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignupRequest } from '../signup/signup-request';
import { Observable, throwError } from 'rxjs';
import { LoginRequest } from '../login/login-request';
import { LoginResponse } from '../login/login-response';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

/*
authenticationToken	string
expiresAt	string($date-time)
refreshToken	string
username	string
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();


  url: string = 'https://reddit-clone-apirest.herokuapp.com/api';

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  };

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(`${this.url}/auth/signup`, signupRequest, {responseType: 'text'});

  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post(`${this.url}/auth/login`, loginRequest).pipe(
      map((response: any) => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('username', response.username);
        this.localStorage.store('refreshToken', response.refreshToken);
        this.localStorage.store('expiresAt', response.expiresAt);

        this.loggedIn.emit(true);
        this.username.emit(response.username);
        
        return response as LoginResponse;
      })
    );
  }

  logout() {
    this.http.post(`${this.url}/auth/logout`, this.refreshTokenPayload, {responseType: 'text'})
              .subscribe(response => {
                console.log(response);
              }, error => {
                throwError(error);
              });
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');

  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    };
    return this.http.post<LoginResponse>(`${this.url}/auth/refresh/token`, refreshTokenPayload)
    .pipe(tap(response => {
      this.localStorage.store('authenticationToken', response.authenticationToken);
      this.localStorage.store('expiresAt', response.expiresAt)
    }));
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

}
