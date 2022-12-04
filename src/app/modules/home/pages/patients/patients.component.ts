import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/core/models/patient';
import { PatientsService } from 'src/app/core/services/patients.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RoutingService } from 'src/app/core/services/routing.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SnackerService } from 'src/app/core/services/snacker.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { InfoPatientComponent } from './info-patient/info-patient.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css', '../../../../shared/styles/crud.css']
})
export class PatientsComponent implements OnInit {

  listPatients: Patient[] = [];
  isSmall: boolean = false;
  search: string = '';

  displayedColumns: string[] = ['name', 'email', 'phone', 'birth'];
  displayedColumnsTotal = [...this.displayedColumns, 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private readonly patientsService: PatientsService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly routingService: RoutingService,
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
    this.loaderService.isLoading.next(true);
    this.patientsService.getPatients()
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.listPatients = [...res];
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

  applyFilter(): void {
    this.dataSource.filter = this.search.trim().toLowerCase();
  }

  resetTable (): void {
    this.loadPatients();
    this.search = '';
  }

  addPatient (): void {
    this.routingService.goToAddPatient();
  }

  deletePatient (patient: Patient): void {
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

  editPatient (patient: Patient): void {
    this.routingService.goToEditPatient(patient._id);
  }

  openInfoPatient (patient: Patient) {
    const dialogRef = this.dialog.open(InfoPatientComponent, {
      width: '350px',
      data: patient
    });
    dialogRef.afterClosed();
  }

}
