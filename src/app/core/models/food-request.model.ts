import { Mean } from '@core/enums/mean';
import { Dish } from '@core/enums/dish';
import { IngredientModel } from './ingredient.model';
import { Rating } from '@core/enums/rating';

export interface FoodRequestModel {
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
    rating?: Rating;
}