import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isSmall: boolean = false;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private readonly routingService: RoutingService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 959px)'])
      .subscribe(result => {
        this.isSmall = false;
        if (result.matches) {
          this.isSmall = true;
        }
      });
  }

  isAdmin (): boolean {
    return this.authService.isAdmin();
  }

  logout (): void {
    this.authService.logout();
  }

  goToPatients (): void {
    this.routingService.goToHome();
  }

  goToEmployees (): void {
    this.routingService.goToEmployees();
  }

  goToRecipes (): void {
    this.routingService.goToRecipes();
  }

  goToRoutines (): void {
    this.routingService.goToRoutines();
  }

  onToggleSidenav () {
    this.sidenavToggle.emit();
  }
 
}
