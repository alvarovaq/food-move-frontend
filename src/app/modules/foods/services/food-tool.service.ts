import { Injectable } from '@angular/core';
import { Dish } from '@core/enums/dish';
import { Mean } from '@core/enums/mean';
import { FoodModel } from '@core/models/food.model';
import { RecipeModel } from '../../../core/models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FoodToolService {

  constructor() { }

  getBackground (mean: Mean): string {
    switch(mean) {
      case Mean.Desayuno: return 'rgba(255,0,0,0.2)';
      case Mean.Comida: return 'rgba(0,255,0,0.2)';
      case Mean.Cena: return 'rgba(0,0,255,0.2)';
      default: return 'rgba(0,0,0,0)';
    }
  }

  getIcon (mean: Mean): string {
    switch(mean) {
      case Mean.Desayuno: return 'coffee';
      case Mean.Comida: return 'restaurant';
      case Mean.Cena: return 'fastfood';
      default: return 'restaurant';
    }
  }

  sort (a: FoodModel | RecipeModel, b: FoodModel | RecipeModel): number {
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
  }

}
