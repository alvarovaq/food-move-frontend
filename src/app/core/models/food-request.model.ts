import { Mean } from '@core/enums/mean';
import { Dish } from '@core/enums/dish';
import { IngredientModel } from './ingredient.model';

export interface FoodRequestModel {
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