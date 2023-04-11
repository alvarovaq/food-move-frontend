import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeRequestModel } from '@core/models/employee-request.model';
import { EmployeeModel } from '@core/models/employee.model';
import { AuthService } from '@core/services/auth.service';
import { EmployeesService } from '@core/services/employees.service';
import { LoaderService } from '@core/services/loader.service';
import { SnackerService } from '@core/services/snacker.service';
import { OptionalPipe } from '@shared/pipes/optional.pipe';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.css', '../../../../assets/styles/form.css']
})
export class ConfigurationPageComponent implements OnInit {

  employee: EmployeeModel | null = null;

  constructor(
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
    );
  }

  setEmployee (employee: EmployeeModel | null): void {
    this.employee = employee;
  }

}
