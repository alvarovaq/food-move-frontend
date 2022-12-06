import { Injectable } from '@angular/core';
import { CanLoad} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterService } from '../services/router.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {

  constructor (
    private readonly routerService: RouterService,
    private readonly authService: AuthService
  ) {}

  async canLoad(): Promise<boolean> {
    const isLogin = this.authService.isLogin();
    if (isLogin) {
      this.authService.setSession();
      await this.routerService.goToPatients();
      return false;
    } else {
      return true;
    }
  }
  
}
