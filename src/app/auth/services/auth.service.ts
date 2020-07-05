import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignupRequest } from '../signup/signup-request';
import { Observable } from 'rxjs';
import { LoginRequest } from '../login/login-request';
import { LoginResponse } from '../login/login-response';
import { map } from 'rxjs/operators';
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

  url: string = 'https://reddit-clone-apirest.herokuapp.com/api';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequest: SignupRequest): Observable<string> {
    return this.http.post(`${this.url}/auth/signup`, signupRequest, {responseType: 'text'});

  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post(`${this.url}/auth/login`, loginRequest).pipe(
      map((response: any) => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('username', response.username);
        this.localStorage.store('refreshToken', response.refreshToken);
        this.localStorage.store('expiresAt', response.expiresAt);
        
        return response as LoginResponse;
      })
    );
  }

}
