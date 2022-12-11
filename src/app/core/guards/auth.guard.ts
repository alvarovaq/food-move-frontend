import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';
import { RouterService } from '../../shared/services/router.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (
    private authService: AuthService,
    private routerService: RouterService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLogin = this.authService.isLogin();
      if (!isLogin) this.routerService.goToLogin();
      return isLogin;
  }
  
}
