import { SubtypeFood } from "../enums/subtype-food";
import { TypeFood } from "../enums/type-food";
import { IngredientRequestModel } from "./ingredient-request.model";

export interface RecipeRequestModel {
    title: string;
    description: string;
    type: TypeFood;
    subtype: SubtypeFood;
    links: string[];
    ingredients: IngredientRequestModel[];
}