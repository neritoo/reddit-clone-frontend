import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loginRequest: LoginRequest;
  loginResponse: LoginResponse;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {
    this.loginRequest = new LoginRequest();
    this.loginResponse = new LoginResponse();
    this.registerSuccessMessage = '';
  }

  ngOnInit(): void {
    this.createForm();

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Usuario registrado correctamente');
        this.registerSuccessMessage = 'Porfavor, verifique su bandeja de entradas en su correo electrónico' +
        'para activar su cuenta. Active su cuenta antes de iniciar sesión!'
      }
    });
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
      this.toastr.success('Sesión iniciada');
      this.loginResponse = response;
      console.log(this.loginResponse);
      this.isError = false;
      this.router.navigateByUrl('/');
    }, error => {
      this.isError = true;
      throwError(error);
    });

  }
}
