import { Dish } from '@core/enums/dish';
import { Meal } from '@core/enums/meal';
import { IngredientModel } from './ingredient.model';
import { Rating } from '../enums/rating';

export interface FoodModel {
    _id: string;
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