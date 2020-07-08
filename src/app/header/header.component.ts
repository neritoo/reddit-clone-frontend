import { Component, OnInit } from '@angular/core';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  isLoggedIn: boolean;
  username: string;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(resp => this.isLoggedIn = resp);
    this.authService.username.subscribe(resp => this.username = resp);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
  }

  goToUserProfile() {
    this.router.navigate(['/user-profile', this.username]);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login']);
    this.toastr.info('Has cerrado sesión')
  }

}
