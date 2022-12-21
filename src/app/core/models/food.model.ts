import { Dish } from '@core/enums/dish';
import { Mean } from '@core/enums/mean';
import { IngredientModel } from './ingredient.model';

export interface FoodModel {
    _id: string;
    patient: string;
    title: string;
    description?: string;
    mean: Mean;
    dish: Dish;
    links: string[];
    ingredients: IngredientModel[];
    comments?: string;
    date: Date;
    done?: boolean;
}