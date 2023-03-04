import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@core/services/loader.service';
import { PatientsService } from '@core/services/patients.service';
import { PatientModel } from '../../../../core/models/patient.model';
import { finalize } from 'rxjs/operators';
import { RouterService } from '../../../../core/services/router.service';
import { SnackerService } from '../../../../core/services/snacker.service';
import { FoodModel } from '../../../../core/models/food.model';
import { FoodsService } from '@core/services/foods.service';
import { Mean } from '@core/enums/mean';
import { Dish } from '../../../../core/enums/dish';
import { ViewPatientService } from '../../../../core/services/view-patient.service';
import { sequence } from '@angular/animations';
import { DateRange } from '../../../../core/interfaces/date-range';
import { DialogService } from '../../../../core/services/dialog.service';

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.css']
})
export class FoodsPageComponent implements OnInit {

  weekdays: {name: string; color: string; items: FoodModel[]; date: Date}[] = [
    {
      name: 'Lunes',
      color: 'rgba(0, 255, 0, 0.2)',
      items: [],
      date: new Date()
    },
    {
      name: 'Martes',
      color: 'rgba(255, 0, 0, 0.2)',
      items: [],
      date: new Date()
    },
    {
      name: 'Miércoles',
      color: 'rgba(0, 0, 255, 0.2)',
      items: [],
      date: new Date()
    },
    {
      name: 'Jueves',
      color: 'rgba(0, 255, 0, 0.2)',
      items: [],
      date: new Date()
    },
    {
      name: 'Viernes',
      color: 'rgba(0, 255, 0, 0.2)',
      items: [],
      date: new Date()
    },
    {
      name: 'Sábado',
      color: 'rgba(0, 255, 0, 0.2)',
      items: [],
      date: new Date()
    },
    {
      name: 'Domingo',
      color: 'rgba(0, 255, 0, 0.2)',
      items: [],
      date: new Date()
    }
  ];

  patient: PatientModel | null = null;
  dateRange: DateRange = this.getDateRange(new Date());

  breakfast: FoodModel[] = [];
  lunch: FoodModel[] = [];
  dinner: FoodModel[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly patientsService: PatientsService,
    private readonly foodsService: FoodsService,
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
        this.loadFoods();
      },
      err => {
        console.log(err);
        this.routerService.goToPatients();
        this.snackerService.showError("No se ha encontrado al paciente");
      }
    );
  }

  getDates (date: Date): Array<Date> {
    const cpy_date = new Date(date);
    cpy_date.setDate(cpy_date.getDate() - cpy_date.getDay() + 1);
    let dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(cpy_date));
      cpy_date.setDate(cpy_date.getDate() + 1);
    }
    return dates;
  }

  getDateRange (date: Date): DateRange {
    const cpy_date = new Date(date);
    return {
      startDate: new Date(date.setDate(date.getDate() - date.getDay() + 1)),
      endDate: new Date(cpy_date.setDate(cpy_date.getDate() + 7 - cpy_date.getDay()))
    }
  }

  loadFoods (): void {
    this.loaderService.isLoading.next(true);
    this.foodsService.getFoods(this.patient!._id, this.dateRange)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe(
      res => {
        console.log(res);
        this.weekdays.forEach((_, i) => {
          this.weekdays[i].items = res.filter(foodItem => {
            const day = foodItem.date.getDay();
            return day - 1 < 0 ? 6 : day - 1 == i;
          });
          const cpy_startDate = new Date(this.dateRange.startDate);
          this.weekdays[i].date = new Date(cpy_startDate.setDate(cpy_startDate.getDate() + i));
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  getBackgroundFood (food: FoodModel): string {
    if (food.mean == Mean.Desayuno) {
      return 'rgba(255,0,0,0.2)';
    } else if (food.mean == Mean.Comida) {
      return 'rgba(0,255,0,0.2)';
    } else {
      return 'rgba(0,0,255,0.2)';
    }
  }

  getIconFood (food: FoodModel): string {
    if (food.mean == Mean.Desayuno) {
      return 'coffee';
    } else if (food.mean == Mean.Comida) {
      return 'restaurant';
    } else {
      return 'fastfood';
    }
  }

  changeDateRange (nWeeks: number): void {
    const day = new Date(this.dateRange.startDate.setDate(this.dateRange.startDate.getDate() + 7 * nWeeks));
    this.dateRange = this.getDateRange(day);
    this.loadFoods();
  }

  sortFood (a: FoodModel, b: FoodModel): number {
    const pa: number = this.getPointsDish(a.dish);
    const pb: number = this.getPointsDish(b.dish); 
    if (pa < pb) {
      return -1;
    } else if (pa > pb) {
      return 1;
    } else {
      return 0;
    }
  }

  getPointsDish (dish: Dish): number {
    switch(dish) {
      case Dish.Principal: return 0;
      case Dish.Primero: return 1;
      case Dish.Segundo: return 2;
      case Dish.Postre: return 3;
      default: return 4;
    }
  }

  addFood (date: Date): void {
    this.routerService.goToAddFood(date);
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

}
