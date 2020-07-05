import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loginRequest: LoginRequest;
  loginResponse: LoginResponse;
  isError;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginRequest = new LoginRequest();
  }

  ngOnInit(): void {
    this.createForm();
  }

  // Getters validators

  get usernameValidator() {
    return this.loginForm.get("username").invalid && this.loginForm.get("username").touched;
  }

  get passwordValidator() {
    return this.loginForm.get("password").invalid && this.loginForm.get("password").touched;
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {

    this.loginRequest.username = this.loginForm.controls.username.value;
    this.loginRequest.password = this.loginForm.controls.password.value;

    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls)
      .forEach(control => {
        control.markAsTouched();
      });
    }

    this.authService.login(this.loginRequest).subscribe(response => {
      this.loginResponse = response;
      console.log(this.loginResponse);
      console.log('Login Successful');
    })

  }
}
