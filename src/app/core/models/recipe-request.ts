import { SubtypeFood } from "../enums/subtype-food";
import { TypeFood } from "../enums/type-food";
import { IngredientRequest } from "./ingredient-request";

export interface RecipeRequest {
    title: string;
    description: string;
    type: TypeFood;
    subtype: SubtypeFood;
    links: string[];
    ingredients: IngredientRequest[];
}