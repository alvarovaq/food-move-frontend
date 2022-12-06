import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SnackerService } from '@core/services/snacker.service';
import { DialogService } from '@core/services/dialog.service';
import { EmployeesPageComponent } from './pages/employees-page/employees-page.component';
import { EmployeesComponent } from '../employees/employees.component';
import { InfoEmployeeComponent } from './components/info-employee/info-employee.component';
import { AddEmployeePageComponent } from './pages/add-employee-page/add-employee-page.component';


@NgModule({
  declarations: [
    EmployeesPageComponent,
    EmployeesComponent,
    InfoEmployeeComponent,
    AddEmployeePageComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule
  ],
  providers: [
    SnackerService,
    DialogService
  ]
})
export class EmployeesModule { }
