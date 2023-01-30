import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PatientModel } from '@core/models/patient.model';
import { PatientsService } from '@shared/services/patients.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterService } from '@shared/services/router.service';
import { LoaderService } from '@shared/services/loader.service';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SnackerService } from '@shared/services/snacker.service';
import { DialogService } from '@shared/services/dialog.service';
import { InfoPatientComponent } from '@modules/patients/components/info-patient/info-patient.component';
import { Sort, SortDirection } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { DEFAULT_LIMIT } from '@core/constants';

@Component({
  selector: 'app-patients-page',
  templateUrl: './patients-page.component.html',
  styleUrls: ['./patients-page.component.css', '../../../../global/styles/crud.css']
})
export class PatientsPageComponent implements OnInit {

  listPatients: PatientModel[] = [];
  isSmall: boolean = false;
  isLoadingResults = false;

  displayedColumns: string[] = ['name', 'email', 'phone', 'birth'];
  displayedColumnsTotal = [...this.displayedColumns, 'actions'];
  dataSource!: MatTableDataSource<any>;

  search: string = '';
  searchFields: string[] = ['name', 'surname', 'email', 'phone'];
  
  sortField: string = "name";
  sortDirection: string = 'asc';

  page: number = 0;
  limit: number = DEFAULT_LIMIT;
  total: number = 0;

  constructor(
    private readonly patientsService: PatientsService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly routerService: RouterService,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService,
    private readonly dialogService: DialogService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPatients();
    this.setColumnsBySize();
  }

  loadPatients (): void {
    this.isLoadingResults = true;
    const sort = this.sortField == "name" ? [{field: "name", direction: this.sortDirection}, {field: "surname", direction: this.sortDirection}] : [{field: this.sortField, direction: this.sortDirection}];
    this.patientsService.getPatientsPagination({
      paging: {
        page: this.page + 1,
        limit: this.limit
      },
      sorting: sort,
      search: {search: this.search, fields: this.searchFields},
      filter: {}
    })
    .pipe(finalize(() => {
      this.isLoadingResults = false;
    }))
    .subscribe(
      res => {
        this.total = res.total;
        this.listPatients = [...res.items];
        this.dataSource = new MatTableDataSource(this.listPatients);
      },
      err => console.log(err)
    );
    this.dataSource = new MatTableDataSource(this.listPatients);
  }

  getTitleColumn (column: string): string {
    switch (column) {
      case "name":
        return "Nombre";
      case "email":
        return "Email";
      case "phone":
        return "Teléfono";
      case "birth":
        return "Nacimiento";
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
          this.displayedColumns = ['name', 'email', 'phone', 'birth'];
          this.updateDisplayedColumnsTotal();
        }
      });
  }

  updateDisplayedColumnsTotal (): void {
    this.displayedColumnsTotal = [...this.displayedColumns, 'actions'];
  }

  changeSort (sort: Sort) {
    this.sortDirection = sort.direction;
    this.sortField = sort.active;
    this.page = 0;
    this.loadPatients();
  }

  changePage (e: PageEvent) {
    this.page = e.pageIndex;
    this.loadPatients();
  }

  applyFilter(): void {
    this.page = 0;
    this.loadPatients();
  }

  resetTable (): void {
    this.loadPatients();
    this.search = '';
  }

  addPatient (): void {
    this.routerService.goToAddPatient();
  }

  deletePatient (patient: PatientModel): void {
    this.dialogService.openConfirmDialog('Eliminar paciente', 'Seguro que quieres eliminar a ' + patient.name + ' ' + patient.surname + '?')
    .subscribe(res => {
      if (res) {
        this.loaderService.isLoading.next(true);
        this.patientsService.removePatient(patient._id)
        .pipe(finalize(() => {
          this.loaderService.isLoading.next(false);
        }))
        .subscribe(
          res => {
            this.snackerService.showSuccessful("Paciente eliminado con éxito");
            this.loadPatients();
          },
          err => {
            console.log(err);
            this.snackerService.showError(err.error.message);
          }
          );
      }
    });
  }

  editPatient (patient: PatientModel): void {
    this.routerService.goToEditPatient(patient._id);
  }

  openInfoPatient (patient: PatientModel): void {
    const dialogRef = this.dialog.open(InfoPatientComponent, {
      width: '350px',
      data: patient
    });
    dialogRef.afterClosed();
  }

  viewPatient (patient: PatientModel): void {
    this.routerService.goToGraphics(patient._id);
  }

}
