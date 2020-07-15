import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['login']);
        return false;
      }

      let role = next.data['role'] as string;
      console.log(role);

      if (this.authService.hasRole(role)) {
        return true;
      }
      
      alert('Acceso Denegado');

      this.router.navigate(['login']);

      return false;

  }
  
}
