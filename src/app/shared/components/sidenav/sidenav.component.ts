import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { RouterService } from '@core/services/router.service';
import { EmployeeModel } from '../../../core/models/employee.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  employee: EmployeeModel | null = null;

  constructor(
    private readonly routerService: RouterService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$
    .subscribe(
      res => {
        this.employee = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  onSidenavClose () {
    this.sidenavClose.emit();
  }

  isAdmin (): boolean {
    return this.employee ? this.employee?.admin : false;
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

  goToDiets (): void {
    this.routerService.goToDiet();
    this.onSidenavClose();
  }

  goToRoutines (): void {
    this.routerService.goToRoutines();
    this.onSidenavClose();
  }

}
