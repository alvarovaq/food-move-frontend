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
import { FoodToolService } from '../../services/food-tool.service';

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.css']
})
export class FoodsPageComponent implements OnInit {

  weekdays: {name: string; items: FoodModel[]; date: Date}[] = [
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
    private readonly activatedRoute: ActivatedRoute,
    private readonly patientsService: PatientsService,
    private readonly foodsService: FoodsService,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService,
    private readonly loaderService: LoaderService,
    private readonly viewPatientService: ViewPatientService,
    private readonly dialogService: DialogService,
    public readonly foodToolService: FoodToolService
  ) { }

  ngOnInit(): void {
    this.viewPatientService.patient$
    .subscribe(
      res => {
        this.patient = res;
        const params = this.activatedRoute.snapshot.params;
        if (params["date"]) this.dateRange = this.getDateRange(new Date(params["date"]));
        this.loadFoods();
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
    this.loadFoods();
  }

  loadFoods (): void {
    this.loaderService.isLoading.next(true);
    this.foodsService.getFoods(this.patient!._id, this.dateRange)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe(
      res => {
        this.weekdays.forEach((_, i) => {
          this.weekdays[i].items = res.filter(foodItem => {
            return this.getDay(foodItem.date) - 1 == i;
          }).sort((a,b) => this.foodToolService.sort(a,b));
          this.weekdays[i].date = this.addDay(this.dateRange.startDate, i);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  /*getBackgroundFood (food: FoodModel): string {
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

  sortFood (a: FoodModel, b: FoodModel): number {
    const meanA: number = this.getPointsMean(a.mean);
    const meanB: number = this.getPointsMean(b.mean); 
    if (meanA < meanB) {
      return -1;
    } else if (meanA > meanB) {
      return 1;
    } else {
      const dishA: number = this.getPointsDish(a.dish);
      const dishB: number = this.getPointsDish(b.dish);
      if (dishA < dishB) {
        return -1;
      } else if (dishA > dishB) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  getPointsMean (mean: Mean): number {
    switch(mean) {
      case Mean.Desayuno: return 0;
      case Mean.Comida: return 1;
      case Mean.Cena: return 2;
      default: return 3;
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
  }*/

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
