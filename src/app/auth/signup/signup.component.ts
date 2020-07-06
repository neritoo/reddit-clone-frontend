import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SignupRequest } from './signup-request';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swall from "sweetalert2";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  user: SignupRequest;

  constructor(private authService: AuthService, private fb: FormBuilder,
    private toastr: ToastrService, private router: Router) {
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

    this.waitAlert();

    if (this.signUpForm.invalid) {
      return Object.values(this.signUpForm.controls)
      .forEach(control => {
        control.markAsTouched();
      });
    }

    this.user.username = this.signUpForm.controls.username.value;
    this.user.password = this.signUpForm.controls.password.value;
    this.user.email = this.signUpForm.controls.email.value;

    this.authService.signup(this.user).subscribe(response => {
      Swal.close();
      console.log(response);
      this.router.navigate(['/login'], { queryParams: {registered: true}})
    }, () => {
      this.toastr.error("Fallo al registrar usuario! Porfavor, intente nuevamente");
    });

  }

  waitAlert() {
    Swal.fire({
      icon: 'info',
      title: 'Espere porfavor...',
      allowOutsideClick: false,
      showConfirmButton: false
    });
  }

}
