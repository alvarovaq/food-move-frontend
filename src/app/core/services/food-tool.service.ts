import { Injectable } from '@angular/core';
import { Dish } from '@core/enums/dish';
import { Meal } from '@core/enums/meal';
import { FoodModel } from '@core/models/food.model';
import { RecipeModel } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FoodToolService {

  constructor() { }

  getBackground (meal: Meal): string {
    switch(meal) {
      case Meal.Desayuno: return 'rgba(255,0,0,0.2)';
      case Meal.Almuerzo: return 'rgba(0,255,0,0.2)';
      case Meal.Merienda: return 'rgba(255,255,0,0.2)';
      case Meal.Cena: return 'rgba(0,0,255,0.2)';
      default: return 'rgba(0,0,0,0)';
    }
  }

  getIcon (meal: Meal): string {
    switch(meal) {
      case Meal.Desayuno: return 'coffee';
      case Meal.Almuerzo: return 'restaurant';
      case Meal.Merienda: return 'kitchen';
      case Meal.Cena: return 'fastfood';
      default: return 'restaurant';
    }
  }

  sort (a: FoodModel | RecipeModel, b: FoodModel | RecipeModel): number {
    const mealA: number = this.getPointsMeal(a.meal);
    const mealB: number = this.getPointsMeal(b.meal); 
    if (mealA < mealB) {
      return -1;
    } else if (mealA > mealB) {
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

  getPointsMeal (meal: Meal): number {
    switch(meal) {
      case Meal.Desayuno: return 0;
      case Meal.Almuerzo: return 1;
      case Meal.Merienda: return 2;
      case Meal.Cena: return 3;
      default: return 4;
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
