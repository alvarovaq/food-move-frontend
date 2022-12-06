import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor (
    private readonly routerService: RouterService,
    private readonly authService: AuthService
  ) {}

  async canLoad() {
    const isLogin = this.authService.isLogin();
    if (isLogin) {
      this.authService.setSession();
      return true;
    } else {
      await this.routerService.goToLogin();
      return false;
    }
  }
  
}
