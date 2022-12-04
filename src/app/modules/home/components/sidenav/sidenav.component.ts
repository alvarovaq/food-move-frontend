import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  constructor(
    private readonly routingService: RoutingService,
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
    this.routingService.goToHome();
    this.onSidenavClose();
  }

  goToEmployees (): void {
    this.routingService.goToEmployees();
    this.onSidenavClose();
  }

  goToRecipes (): void {
    this.routingService.goToRecipes();
    this.onSidenavClose();
  }

  goToRoutines (): void {
    this.routingService.goToRoutines();
    this.onSidenavClose();
  }

}
