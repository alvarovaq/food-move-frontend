import { SubtypeFood } from "../enums/subtype-food";
import { TypeFood } from "../enums/type-food";
import { Ingredient } from "./ingredient";

export interface Recipe {
    _id: string;
    title: string;
    description: string;
    type: TypeFood;
    subtype: SubtypeFood;
    links: string[];
    ingredients: Ingredient[];
}