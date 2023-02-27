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
import { TableStructure } from '@shared/components/table/interfaces/table-structure';
import { DEFAULT_LIMIT } from 'src/app/constants/app.constants';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { TypeValueTable } from '@shared/components/table/enums/type-value-table';
import { ViewPatientService } from '../../../../core/services/view-patient.service';

@Component({
  selector: 'app-consults-page',
  templateUrl: './consults-page.component.html',
  styleUrls: ['./consults-page.component.css', '../../../../../assets/styles/crud.css']
})
export class ConsultsPageComponent implements OnInit {

  patient: PatientModel | null = null;

  listConsults: ConsultModel[] = [];
  isSmall: boolean = false;
  isLoadingResults: boolean = false;

  dataSource!: MatTableDataSource<any>;

  tableStructure: TableStructure[] = [
    {index: 1, field: 'created_at', header: 'Fecha', sort: true, type: TypeValueTable.DATE},
    {index: 2, field: 'masa', header: 'Masa [Kg]', sort: true},
    {index: 3, field: 'imc', header: 'IMC [Kg/m2]', sort: true},
    {index: 4, field: 'per_abdominal', header: 'Perímetro abdominal [cm]', sort: true},
    {index: 5, field: 'tension', header: 'Tensión Arterial [mmHg]', sort: true}
  ];
  indexDisplay: number = 5;

  sortField: string = 'created_at';
  sortDirection: string = 'asc';

  limit: number = DEFAULT_LIMIT;
  page: number = 0;
  total: number = 0;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly patientsService: PatientsService,
    private readonly consultsService: ConsultsService,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService,
    private readonly dialogService: DialogService,
    private readonly loaderService: LoaderService,
    private readonly viewPatientService: ViewPatientService
  ) { }

  ngOnInit(): void {
    this.viewPatientService.patient$
    .subscribe(
      res => {
        this.patient = res;
        this.loadConsults();
        this.setColumnsBySize();
      },
      err => {
        console.log(err);
        this.routerService.goToPatients();
        this.snackerService.showError("No se ha encontrado al paciente");
      }
    );
  }

  loadConsults (): void {
    if (!this.patient) return;
    this.isLoadingResults = true;
    this.consultsService.filter({
      paging: {page: this.page + 1, limit: this.limit},
      sorting: [{field: this.sortField, direction: this.sortDirection}],
      filter: {patient: this.patient!._id}
    })
    .pipe(finalize(() => {
      this.isLoadingResults = false;
    }))
    .subscribe(
      res => {
        this.total = res.total;
        this.listConsults = [...res.items];
        this.dataSource = new MatTableDataSource(this.listConsults);
      },
      err => console.log(err)
    );
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
          this.indexDisplay = 4;
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 650px)','(min-width:551px)'])
      .subscribe(result => {
        if (result.matches) {
          this.indexDisplay = 3;
        }
      });
    this.breakpointObserver
      .observe(['(max-width: 550px)'])
      .subscribe(result => {
        if (result.matches) {
          this.indexDisplay = 2;
        }
      });
      this.breakpointObserver
      .observe(['(max-width: 350px)'])
      .subscribe(result => {
        if (result.matches) {
          this.indexDisplay = 1;
        }
      });
    this.breakpointObserver
      .observe(['(min-width: 901px)'])
      .subscribe(result => {
        if (result.matches) {
          this.indexDisplay = 5;
        }
      });
  }

  changeSort (sort: Sort) {
    this.sortDirection = sort.direction;
    this.sortField = sort.active;
    this.page = 0;
    this.loadConsults();
  }

  changePage (e: PageEvent) {
    this.page = e.pageIndex;
    this.loadConsults();
  }

  resetTable (): void {
    this.page = 0;
    this.loadConsults();
  }

  addConsult (): void {
    this.routerService.goToAddConsult();
  }

  editConsult (consult: ConsultModel): void {
    this.routerService.goToEditConsult(consult._id);
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
            this.loadConsults();
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
      width: '500px',
      data: consult
    });
    dialogRef.afterClosed();
  }

}
