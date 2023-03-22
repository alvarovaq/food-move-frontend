import { RecipeModel } from "./recipe.model";

export interface WeeklyDietModel {
    _id: string;
    title: string;
    description?: string;
    monday: RecipeModel[];
    tuesday: RecipeModel[];
    wednesday: RecipeModel[];
    thursday: RecipeModel[];
    friday: RecipeModel[];
    saturday: RecipeModel[];
    sundays: RecipeModel[];
}