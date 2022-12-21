import { TypeFood } from '@core/enums/type-food';
import { SubtypeFood } from '@core/enums/subtype-food';
import { IngredientModel } from './ingredient.model';

export interface FoodRequestModel {
    title: string;
    description?: string;
    type: TypeFood;
    subtype: SubtypeFood;
    links: string[];
    ingredients: IngredientModel[];
    comments?: string;
    date: Date;
    done?: boolean;
}