import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SignupRequest } from './signup-request';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  user: SignupRequest;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.user = new SignupRequest;
  }

  ngOnInit(): void {
    this.createForm();
  }

  // Getters validators

  get emailValidation() {
    return this.signUpForm.get('email').invalid && this.signUpForm.get('email').touched;
  }

  get usernameValidation() {
    return this.signUpForm.get('username').invalid && this.signUpForm.get('username').touched;
  }

  get passwordValidation() {
    return this.signUpForm.get('password').invalid && this.signUpForm.get('password').touched;
  }

  createForm() {
    this.signUpForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  signup() {

    if (this.signUpForm.invalid) {
      return Object.values(this.signUpForm.controls)
      .forEach(control => {
        control.markAsTouched();
      });
    }

    this.user.username = this.signUpForm.controls.username.value;
    this.user.password = this.signUpForm.controls.password.value;
    this.user.email = this.signUpForm.controls.email.value;

    this.authService.signup(this.user).subscribe(response => console.log(response));

  }

}
