import { SubtypeFood } from '@core/enums/subtype-food';
import { TypeFood } from '@core/enums/type-food';
import { IngredientModel } from './ingredient.model';

export interface FoodModel {
    _id: string;
    patient: string;
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