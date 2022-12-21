import { Dish } from "../enums/dish";
import { Mean } from "../enums/mean";
import { IngredientRequestModel } from "./ingredient-request.model";

export interface RecipeRequestModel {
    title: string;
    description?: string;
    mean: Mean;
    dish: Dish;
    links: string[];
    ingredients: IngredientRequestModel[];
}