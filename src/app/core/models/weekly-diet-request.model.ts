import { RecipeModel } from "./recipe.model";

export interface WeeklyDietRequest {
    name: string;
    description?: string;
    monday: RecipeModel[];
    thuesday: RecipeModel[];
    wednesday: RecipeModel[];
    thursday: RecipeModel[];
    friday: RecipeModel[];
    saturday: RecipeModel[];
    sundays: RecipeModel[];
}