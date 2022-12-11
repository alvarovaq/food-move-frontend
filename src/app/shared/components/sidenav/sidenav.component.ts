import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { RouterService } from '@shared/services/router.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  constructor(
    private readonly routerService: RouterService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSidenavClose () {
    this.sidenavClose.emit();
  }

  isAdmin (): boolean {
    return this.authService.isAdmin();
  }

  logout (): void {
    this.authService.logout();
    this.onSidenavClose();
  }

  goToPatients (): void {
    this.routerService.goToPatients();
    this.onSidenavClose();
  }

  goToEmployees (): void {
    this.routerService.goToEmployees();
    this.onSidenavClose();
  }

  goToRecipes (): void {
    this.routerService.goToRecipes();
    this.onSidenavClose();
  }

  goToRoutines (): void {
    this.routerService.goToRoutines();
    this.onSidenavClose();
  }

}
