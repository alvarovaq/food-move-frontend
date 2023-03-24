import { RecipeModel } from "./recipe.model";

export interface WeeklyDietRequest {
    title: string;
    description?: string;
    monday: RecipeModel[];
    tuesday: RecipeModel[];
    wednesday: RecipeModel[];
    thursday: RecipeModel[];
    friday: RecipeModel[];
    saturday: RecipeModel[];
    sunday: RecipeModel[];
}