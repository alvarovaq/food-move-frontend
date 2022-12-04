import { Injectable } from '@angular/core';
import { CanLoad} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutingService } from '../services/routing.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {

  constructor (
    private readonly routingService: RoutingService,
    private readonly authService: AuthService
  ) {}

  async canLoad(): Promise<boolean> {
    const isLogin = this.authService.isLogin();
    if (isLogin) {
      this.authService.setSession();
      await this.routingService.goToHome();
      return false;
    } else {
      return true;
    }
  }
  
}
