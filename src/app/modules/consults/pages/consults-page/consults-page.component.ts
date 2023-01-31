import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PatientModel } from '@core/models/patient.model';
import { ConsultsService } from '@core/services/consults.service';
import { LoaderService } from '@core/services/loader.service';
import { PatientsService } from '@core/services/patients.service';
import { finalize } from 'rxjs/operators';
import { ConsultModel } from '../../../../core/models/consult.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouterService } from '../../../../core/services/router.service';
import { SnackerService } from '../../../../core/services/snacker.service';
import { DialogService } from '../../../../core/services/dialog.service';
import { InfoConsultComponent } from '../../components/info-consult/info-consult.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consults-page',
  templateUrl: './consults-page.component.html',
  styleUrls: ['./consults-page.component.css', '../../../../../assets/styles/crud.css']
})
export class ConsultsPageComponent implements OnInit {

  patient: PatientModel | null = null;

  isSmall: boolean = false;

  listConsults: ConsultModel[] = [];
  displayedColumns: string[] = ['created_at', 'masa', 'imc', 'per_abdominal', 'tension'];
  displayedColumnsTotal = [...this.displayedColumns, 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly patientsService: PatientsService,
    private readonly consultsService: ConsultsService,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService,
    private readonly dialogService: DialogService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.isLoading.next(true);
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.patientsService.getPatient(params["id"])
      .pipe(finalize(() => this.loaderService.isLoading.next(false)))
      .subscribe(
        res => {
          this.patient = res;
          this.loadPatients();
          this.setColumnsBySize();
        },
        err => {
          console.log(err);
          this.routerService.goToPatients();
          this.snackerService.showError("No se ha encontrado al paciente");
        }
      );
    };
  }

  loadPatients (): void {
    if (!this.patient) return;
    this.loaderService.isLoading.next(true);
    this.consultsService.getConsultsByPatient(this.patient!._id)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.listConsults = [...res];
        this.dataSource = new MatTableDataSource(this.listConsults);
      },
      err => console.log(err)
    );
  }

  getTitleColumn (column: string): string {
    switch (column) {
      case "created_at":
        return "Fecha";
      case "masa":
        return "Masa [Kg]";
      case "imc":
        return "IMC [Kg/m2]";
      case "per_abdominal":
        return "Perímetro Abdominal [cm]";
      case "tension":
        return "Tensión Arterial [mmHg]";
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
          this.displayedColumns = ['created_at', 'masa', 'imc', 'per_abdominal'];
          this.updateDisplayedColumnsTotal();
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 650px)','(min-width:551px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['created_at', 'masa', 'imc'];
          this.updateDisplayedColumnsTotal();
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 550px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['created_at', 'masa'];
          this.updateDisplayedColumnsTotal();
        }
      });
      this.breakpointObserver
      .observe(['(max-width: 350px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['created_at'];
          this.updateDisplayedColumnsTotal();
        }
      });
    this.breakpointObserver
      .observe(['(min-width: 901px)'])
      .subscribe(result => {
        if (result.matches) {
          this.displayedColumns = ['created_at', 'masa', 'imc', 'per_abdominal', 'tension'];
          this.updateDisplayedColumnsTotal();
        }
      });
  }

  updateDisplayedColumnsTotal (): void {
    this.displayedColumnsTotal = [...this.displayedColumns, 'actions'];
  }

  resetTable (): void {
    this.loadPatients();
  }

  addConsult (): void {
    this.routerService.goToAddConsult(this.patient!._id);
  }

  editConsult (consult: ConsultModel): void {
    this.routerService.goToEditConsult(this.patient!._id, consult._id);
  }

  deleteConsult (consult: ConsultModel): void {
    this.dialogService.openConfirmDialog('Eliminar Consulta', 'Seguro que quieres eliminar  la consulta?')
    .subscribe(res => {
      if (res) {
        this.loaderService.isLoading.next(true);
        this.consultsService.removeConsult(consult._id)
        .pipe(finalize(() => {
          this.loaderService.isLoading.next(false);
        }))
        .subscribe(
          res => {
            this.snackerService.showSuccessful("Consulta eliminado con éxito");
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

  openInfoConsult (consult: ConsultModel): void {
    const dialogRef = this.dialog.open(InfoConsultComponent, {
      width: '350px',
      data: consult
    });
    dialogRef.afterClosed();
  }

}
