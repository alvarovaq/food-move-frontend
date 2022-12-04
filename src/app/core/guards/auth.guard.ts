import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutingService } from '../services/routing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor (
    private readonly routingService: RoutingService,
    private readonly authService: AuthService
  ) {}

  async canLoad() {
    const isLogin = this.authService.isLogin();
    if (isLogin) {
      this.authService.setSession();
      return true;
    } else {
      await this.routingService.goToLogin();
      return false;
    }
  }
  
}
