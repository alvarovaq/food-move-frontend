import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { LoaderService } from '@core/services/loader.service';
import { RouterService } from '@core/services/router.service';
import { BehaviorSubject } from 'rxjs';
import { EmployeeModel } from '../../../core/models/employee.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isSmall: boolean = false;
  employee: EmployeeModel | null = null;

  showProfilePanel: boolean = false;

  page: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private readonly routerService: RouterService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly authService: AuthService,
    public readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(
      res => {
        this.employee = res;
      },
      err => {
        console.log(err);
      }
    )
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
    return this.employee ? this.employee.admin : false;
  }

  logout (): void {
    this.authService.logout();
  }

  goToPatients (): void {
    this.page.next(1);
    this.routerService.goToPatients();
  }

  goToEmployees (): void {
    this.page.next(2);
    this.routerService.goToEmployees();
  }

  goToRecipes (): void {
    this.page.next(3);
    this.routerService.goToRecipes();
  }

  goToRoutines (): void {
    this.page.next(4);
    this.routerService.goToRoutines();
  }

  onToggleSidenav () {
    this.sidenavToggle.emit();
  }

}
