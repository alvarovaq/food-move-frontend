import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@shared/services/loader.service';
import { PatientsService } from '@shared/services/patients.service';
import { PatientModel } from '../../../../core/models/patient.model';
import { finalize } from 'rxjs/operators';
import { RouterService } from '../../../../shared/services/router.service';
import { SnackerService } from '../../../../shared/services/snacker.service';
import { FoodModel } from '../../../../core/models/food.model';
import { FoodsService } from '@shared/services/foods.service';
import { TypeFood } from '@core/enums/type-food';
import { SubtypeFood } from '../../../../core/enums/subtype-food';

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.css']
})
export class FoodsPageComponent implements OnInit {

  patient: PatientModel | null = null;
  
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
    this.foodsService.getFoodsByPatient(this.patient!._id)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe(
      res => {
        this.breakfast = [];
        this.lunch = [];
        this.dinner = [];
        res.forEach(food => {
          if (food.type == TypeFood.Desayuno) {
            this.breakfast.push(food);
          } else if (food.type == TypeFood.Comida) {
            this.lunch.push(food);
          } else if (food.type == TypeFood.Cena) {
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

  sortFood (a: FoodModel, b: FoodModel): number {
    const pa: number = this.getPointsDish(a.subtype);
    const pb: number = this.getPointsDish(b.subtype); 
    if (pa < pb) {
      return -1;
    } else if (pa > pb) {
      return 1;
    } else {
      return 0;
    }
  }

  getPointsDish (subtype: SubtypeFood): number {
    switch(subtype) {
      case SubtypeFood.Principal: return 0;
      case SubtypeFood.Primero: return 1;
      case SubtypeFood.Segundo: return 2;
      case SubtypeFood.Postre: return 3;
      default: return 4;
    }
  }

}
