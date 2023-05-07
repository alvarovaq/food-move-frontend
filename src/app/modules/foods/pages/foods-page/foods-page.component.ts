import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@core/services/loader.service';
import { PatientModel } from '@core/models/patient.model';
import { finalize } from 'rxjs/operators';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { FoodModel } from '@core/models/food.model';
import { FoodsService } from '@core/services/foods.service';
import { ViewPatientService } from '@core/services/view-patient.service';
import { DateRange } from '@core/interfaces/date-range';
import { DialogService } from '@core/services/dialog.service';
import { WeeklyCalendarType } from '@shared/components/weekly-calendar/enums/weekly-calendar-type';
import { Day } from '@shared/components/weekly-calendar/interfaces/day';
import { daysInit } from '@shared/components/weekly-calendar/constant/days-init';
import { ImportType } from '@shared/components/import-dialog/enums/import-type';
import { ImportDialogComponent } from '@shared/components/import-dialog/import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DietModel } from '../../../../core/models/diet';
import { addDay, getDateRange, getDateUTC, getDay } from '@core/utils/date-utils';

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.css']
})
export class FoodsPageComponent implements OnInit {

  days: Day[] = daysInit;
  weeklyCalendarType = WeeklyCalendarType;

  patient: PatientModel | null = null;
  dateRange: DateRange = getDateRange(new Date());

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly foodsService: FoodsService,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService,
    private readonly loaderService: LoaderService,
    private readonly viewPatientService: ViewPatientService,
    private readonly dialogService: DialogService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.viewPatientService.patient$
    .subscribe(
      res => {
        this.patient = res;
        const params = this.activatedRoute.snapshot.params;
        if (params["date"]) this.dateRange = getDateRange(new Date(params["date"]));
        this.loadFoods();
      },
      err => {
        console.log(err);
        this.routerService.goToPatients();
        this.snackerService.showError("No se ha encontrado al paciente");
      }
    );
  }

  changeDateRange (nWeeks: number): void {
    const date = addDay(this.dateRange.startDate!, 7 * nWeeks);
    this.dateRange = getDateRange(date);
    this.loadFoods();
  }

  loadFoods (): void {
    this.loaderService.isLoading.next(true);
    this.foodsService.getFoods(this.patient!._id, this.dateRange)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe(
      res => {
        this.setFoods(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  setFoods (foods: FoodModel[]): void {
    this.days.forEach((_, i) => {
      this.days[i].items = foods.filter(foodItem => {
        return getDay(foodItem.date) - 1 == i;
      });
      this.days[i].date = addDay(this.dateRange.startDate!, i);
    });
  }

  addFood (date: Date): void {
    this.routerService.goToAddFood(date);
  }

  editFood (food: FoodModel): void {
    this.routerService.goToEditFood(food._id);
  }

  deleteFood (food: FoodModel): void {
    this.dialogService.openConfirmDialog('Eliminar comida', 'Seguro que quieres eliminar la comida?')
    .subscribe(res => {
      if (res) {
        this.loaderService.isLoading.next(true);
        this.foodsService.removeFood(food._id)
        .pipe(finalize(() => {
          this.loaderService.isLoading.next(false);
        }))
        .subscribe(
          res => {
            this.snackerService.showSuccessful("Comida eliminada con éxito");
            this.loadFoods();
          },
          err => {
            console.log(err);
            this.snackerService.showError(err.error.message);
          }
        );
      }
    });
  }

  importDiet (): void {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      width: '800px',
      data: ImportType.Diet
    });
    dialogRef.afterClosed()
    .subscribe(
      res => {
        if (res) {
          const diet = res as DietModel;
          this.loaderService.isLoading.next(true);
          this.foodsService.importDiet(diet._id, this.patient!._id, getDateUTC(this.dateRange.startDate!))
          .pipe(finalize(() => this.loaderService.isLoading.next(false)))
          .subscribe(
            res => {
              this.setFoods(res);
              this.snackerService.showSuccessful("Dieta importada con éxito.");
            },
            err => {
              console.log(err);
              this.snackerService.showError(err.error);
            }
          )
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
