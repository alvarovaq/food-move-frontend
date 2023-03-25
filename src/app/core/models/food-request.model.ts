import { Meal } from '@core/enums/meal';
import { Dish } from '@core/enums/dish';
import { IngredientModel } from './ingredient.model';
import { Rating } from '@core/enums/rating';

export interface FoodRequestModel {
    patient: string;
    title: string;
    description?: string;
    meal: Meal;
    dish: Dish;
    links: string[];
    ingredients: IngredientModel[];
    comments?: string;
    date: Date;
    done?: boolean;
    rating?: Rating;
}