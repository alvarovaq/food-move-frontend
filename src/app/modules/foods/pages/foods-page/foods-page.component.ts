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

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.css']
})
export class FoodsPageComponent implements OnInit {

  patient: PatientModel | null = null;
  date: Date = new Date();

  breakfast: FoodModel[] = [];
  lunch: FoodModel[] = [];
  dinner: FoodModel[] = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly patientsService: PatientsService,
    private readonly foodsService: FoodsService,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService,
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
          this.loadFoods();
        },
        err => {
          console.log(err);
          this.routerService.goToPatients();
          this.snackerService.showError("No se ha encontrado al paciente");
        }
      );
    };
  }

  loadFoods (): void {
    this.loaderService.isLoading.next(true);
    this.foodsService.getFoodsByPatientAndDate(this.patient!._id, this.date)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe(
      res => {
        this.breakfast = [];
        this.lunch = [];
        this.dinner = [];
        res.forEach(food => {
          if (food.mean == Mean.Desayuno) {
            this.breakfast.push(food);
          } else if (food.mean == Mean.Comida) {
            this.lunch.push(food);
          } else if (food.mean == Mean.Cena) {
            this.dinner.push(food);
          }
        });
        this.breakfast.sort((a,b) => this.sortFood(a,b));
        this.lunch.sort((a,b) => this.sortFood(a,b));
        this.dinner.sort((a,b) => this.sortFood(a,b));
      },
      err => {
        console.log(err.error.message);
      }
    );
  }

  addDate (): void {
    this.date = new Date(this.date.setDate(this.date.getDate() + 1));
    console.log(this.date);
    this.loadFoods();
  }

  subtractDate (): void {
    this.date = new Date(this.date.setDate(this.date.getDate() - 1));
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

}
