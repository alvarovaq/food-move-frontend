import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { LoaderService } from '@core/services/loader.service';
import { RouterService } from '@core/services/router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isSmall: boolean = false;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private readonly routerService: RouterService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService,
    public readonly loaderService: LoaderService
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
    this.routerService.goToPatients();
  }

  goToEmployees (): void {
    this.routerService.goToEmployees();
  }

  goToRecipes (): void {
    this.routerService.goToRecipes();
  }

  goToRoutines (): void {
    this.routerService.goToRoutines();
  }

  onToggleSidenav () {
    this.sidenavToggle.emit();
  }

}
