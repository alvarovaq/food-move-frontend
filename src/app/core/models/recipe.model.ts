import { Dish } from "../enums/dish";
import { Mean } from "../enums/mean";
import { IngredientModel } from "./ingredient.model";

export interface RecipeModel {
    _id: string;
    title: string;
    description?: string;
    mean: Mean;
    dish: Dish;
    links: string[];
    ingredients: IngredientModel[];
}