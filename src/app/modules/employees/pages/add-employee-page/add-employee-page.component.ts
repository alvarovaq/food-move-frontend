import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeModel } from '@core/models/employee.model';
import { EmployeesService } from '@core/services/employees.service';
import { LoaderService } from '@core/services/loader.service';
import { RouterService } from '@core/services/router.service';
import { finalize } from 'rxjs/operators';
import { SnackerService } from '@core/services/snacker.service';
import { EmployeeRequestModel } from '@core/models/employee-request.model';
import { OptionalPipe } from '../../../../shared/pipes/optional.pipe';

@Component({
  selector: 'app-add-employee-page',
  templateUrl: './add-employee-page.component.html',
  styleUrls: ['./add-employee-page.component.css', '../../../../global/styles/form.css']
})
export class AddEmployeePageComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  employee: EmployeeModel | null = null;
  
  buttonClear = {
    name: false,
    surname: false,
    email: false,
    phone: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly employeesService: EmployeesService,
    private readonly optionalPipe: OptionalPipe,
    private readonly loaderService: LoaderService,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService
  ) {}

  ngOnInit(): void {
    this.loaderService.isLoading.next(true);
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.employeesService.getEmployee(params['id'])
      .pipe(finalize(() => {
        this.loaderService.isLoading.next(false);
      }))
      .subscribe(
        res => {
          this.edit = true;
          this.employee = res;
          this.initForm();
        },
        err => {
          this.exit();
          this.snackerService.showError("Algo no ha sucedido como se esperaba");
        }
      );
    } else {
      this.initForm();
      this.loaderService.isLoading.next(false);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.edit ? this.employee!.name : null, [Validators.required]],
      surname: [this.edit ? this.employee!.surname : null],
      email: [this.edit ? this.employee!.email : null, [Validators.required, Validators.email]],
      phone: [this.edit ? this.employee!.phone : null],
      admin: [this.edit ? this.employee!.admin : false],
    });
  }

  get name (): string | null {
    return this.form.value.name;
  }

  get surname (): string | null {
    return this.form.value.surname;
  }

  get email (): string | null {
    return this.form.value.email;
  }

  get phone (): string | null {
    return this.form.value.phone;
  }

  get admin (): boolean {
    return this.form.value.admin;
  }

  clearField (field: string): void {
    this.form.value[field] = null;
    this.form.reset(this.form.value);
  }

  exit(): void {
    this.routerService.goToEmployees();
  }

  addEmployee (): void {
    this.loaderService.isLoading.next(true);
    const employee = this.getEmployeeRequest();
    this.employeesService.createEmployee(employee)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Personal creado con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  editEmployee (): void {
    this.loaderService.isLoading.next(true);
    const employee = this.getEmployeeRequest(true);
    this.employeesService.updateEmployee(this.employee!._id, employee)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Personal editado con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  private getEmployeeRequest (edit: boolean = false): EmployeeRequestModel {
    const request = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: '123456789',
      phone: this.phone,
      admin: this.admin
    };
    return edit ? request : this.optionalPipe.transform(request);
  }

}
