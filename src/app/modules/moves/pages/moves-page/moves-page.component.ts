import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateRange } from '@core/interfaces/date-range';
import { PatientModel } from '@core/models/patient.model';
import { LoaderService } from '@core/services/loader.service';
import { PatientsService } from '@core/services/patients.service';
import { SnackerService } from '@core/services/snacker.service';
import { finalize } from 'rxjs/operators';
import { RouterService } from '../../../../core/services/router.service';
import { ViewPatientService } from '../../../../core/services/view-patient.service';
import { MoveModel } from '../../../../core/models/move.model';
import { DialogService } from '../../../../core/services/dialog.service';
import { MovesService } from '@core/services/moves.service';

@Component({
  selector: 'app-moves-page',
  templateUrl: './moves-page.component.html',
  styleUrls: ['./moves-page.component.css']
})
export class MovesPageComponent implements OnInit {

  weekdays: {name: string; items: MoveModel[]; date: Date}[] = [
    {
      name: 'Lunes',
      items: [],
      date: new Date()
    },
    {
      name: 'Martes',
      items: [],
      date: new Date()
    },
    {
      name: 'Miércoles',
      items: [],
      date: new Date()
    },
    {
      name: 'Jueves',
      items: [],
      date: new Date()
    },
    {
      name: 'Viernes',
      items: [],
      date: new Date()
    },
    {
      name: 'Sábado',
      items: [],
      date: new Date()
    },
    {
      name: 'Domingo',
      items: [],
      date: new Date()
    }
  ];

  patient: PatientModel | null = null;
  dateRange: DateRange = this.getDateRange(new Date());

  constructor(
    private readonly movesService: MovesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService,
    private readonly loaderService: LoaderService,
    private readonly viewPatientService: ViewPatientService,
    private readonly dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.viewPatientService.patient$
    .subscribe(
      res => {
        this.patient = res;
        const params = this.activatedRoute.snapshot.params;
        if (params["date"]) this.dateRange = this.getDateRange(new Date(params["date"]));
        this.loadMoves();
      },
      err => {
        console.log(err);
        this.routerService.goToPatients();
        this.snackerService.showError("No se ha encontrado al paciente");
      }
    );
  }

  addDay (date: Date, days: number): Date {
    const cpy_date = new Date(date);
    return new Date(cpy_date.setDate(cpy_date.getDate() + days));
  }

  getDay (date: Date): number {
    const day = date.getDay();
    return day == 0 ? 7 : day;
  }

  getDateRange (date: Date): DateRange {
    return {
      startDate: this.addDay(date, -1 * this.getDay(date) + 1),
      endDate: this.addDay(date, 7 - this.getDay(date))
    }
  }

  changeDateRange (nWeeks: number): void {
    const date = this.addDay(this.dateRange.startDate, 7 * nWeeks);
    this.dateRange = this.getDateRange(date);
    this.loadMoves();
  }

  loadMoves (): void {
    this.loaderService.isLoading.next(true);
    this.movesService.getMoves(this.patient!._id, this.dateRange)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe(
      res => {
        this.weekdays.forEach((_, i) => {
          this.weekdays[i].items = res.filter(moveItem => {
            return this.getDay(moveItem.date) - 1 == i;
          });
          this.weekdays[i].date = this.addDay(this.dateRange.startDate, i);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  addMove (date: Date): void {
    this.routerService.goToAddMove(date);
  }

  editMove (move: MoveModel): void {
    this.routerService.goToEditMove(move._id);
  }

  deleteMove (move: MoveModel): void {
    this.dialogService.openConfirmDialog('Eliminar ejercicio', 'Seguro que quieres eliminar el ejercicio?')
    .subscribe(res => {
      if (res) {
        this.loaderService.isLoading.next(true);
        this.movesService.removeMove(move._id)
        .pipe(finalize(() => {
          this.loaderService.isLoading.next(false);
        }))
        .subscribe(
          res => {
            this.snackerService.showSuccessful("Ejercicio eliminada con éxito");
            this.loadMoves();
          },
          err => {
            console.log(err);
            this.snackerService.showError(err.error.message);
          }
        );
      }
    });
  }

}
