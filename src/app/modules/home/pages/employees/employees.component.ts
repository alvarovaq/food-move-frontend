import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/core/models/employee';
import { EmployeesService } from 'src/app/core/services/employees.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { finalize } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RoutingService } from 'src/app/core/services/routing.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackerService } from 'src/app/core/services/snacker.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoEmployeeComponent } from './info-employee/info-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css', '../../../../shared/styles/crud.css']
})
export class EmployeesComponent implements OnInit {

  listEmployees: Employee[] = [];
  isSmall: boolean = false;
  search: string = '';

  displayedColumns: string[] = ['name', 'email', 'phone', 'admin'];
  displayedColumnsTotal = [...this.displayedColumns, 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly employeesService: EmployeesService,
    private readonly loaderService: LoaderService,
    private readonly routingService: RoutingService,
    private readonly dialogService: DialogService,
    private readonly snackerService: SnackerService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.setColumnsBySize();
  }

  loadEmployees (): void {
    this.loaderService.isLoading.next(true);
    this.employeesService.getEmployees()
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.listEmployees = [...res];
        this.dataSource = new MatTableDataSource(this.listEmployees);     
      },
      err => console.log(err)
    );
    this.dataSource = new MatTableDataSource(this.listEmployees);
  }

  getTitleColumn (column: string): string {
    switch (column) {
      case "name":
        return "Nombre";
      case "email":
        return "Email";
      case "phone":
        return "Teléfono";
      case "admin":
        return "";
      default:
        return "";
    }
  }

  setColumnsBySize (): void {
    this.breakpointObserver
      .observe(['(max-width: 959px)'])
      .subscribe(result => {
        this.isSmall = false;
        if (result.matches) {
          this.isSmall = true;
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 900px)', '(min-width:651px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['name', 'email', 'phone'];
          this.updateDisplayedColumnsTotal();
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 650px)','(min-width:551px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['name', 'email'];
          this.updateDisplayedColumnsTotal();
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 550px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['name'];
          this.updateDisplayedColumnsTotal();
        }
      });
    this.breakpointObserver
      .observe(['(min-width: 901px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['name', 'email', 'phone', 'admin'];
          this.updateDisplayedColumnsTotal();
        }
      });
  }

  updateDisplayedColumnsTotal (): void {
    this.displayedColumnsTotal = [...this.displayedColumns, 'actions'];
  }

  applyFilter(): void {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }

  resetTable (): void {
    this.loadEmployees();
    this.search = '';
  }

  addEmployee(): void {
    this.routingService.goToAddEmployee();
  }

  deleteEmployee(employee: Employee): void {
    this.dialogService.openConfirmDialog('Eliminar personal', 'Seguro que quieres eliminar a ' + employee.name + ' ' + employee.surname + '?')
    .subscribe(res => {
      if (res) {
        this.loaderService.isLoading.next(true);
        this.employeesService.removeEmployee(employee._id)
        .pipe(finalize(() => {
          this.loaderService.isLoading.next(false);
        }))
        .subscribe(
          res => {
            this.snackerService.showSuccessful("Personal eliminado con éxito");
            this.loadEmployees();
          },
          err => {
            console.log(err);
            this.snackerService.showError(err.error.message);
          }
          );
      }
    });
  }

  editEmployee(employee: Employee): void {
    this.routingService.goToEditEmployee(employee._id);
  }

  openInfoEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(InfoEmployeeComponent, {
      width: '350px',
      data: employee
    });
    dialogRef.afterClosed();
  }

}
