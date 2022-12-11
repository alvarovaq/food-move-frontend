import { SubtypeFood } from "../enums/subtype-food";
import { TypeFood } from "../enums/type-food";
import { IngredientModel } from "./ingredient.model";

export interface RecipeModel {
    _id: string;
    title: string;
    description?: string;
    type: TypeFood;
    subtype: SubtypeFood;
    links: string[];
    ingredients: IngredientModel[];
}