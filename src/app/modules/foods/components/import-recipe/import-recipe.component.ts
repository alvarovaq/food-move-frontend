import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeModel } from '@core/models/recipe.model';
import { RecipesService } from '../../../../core/services/recipes.service';
import { FoodToolService } from '../../services/food-tool.service';

@Component({
  selector: 'app-import-recipe',
  templateUrl: './import-recipe.component.html',
  styleUrls: ['./import-recipe.component.css', '../../../../../assets/styles/import.css']
})
export class ImportRecipeComponent implements OnInit {

  dataSource: RecipeModel[] = [];
  recipes: RecipeModel[] = [];
  selected: RecipeModel | null = null;

  constructor(
    private readonly recipesService: RecipesService,
    public foodToolService: FoodToolService,
    private readonly dialogRef: MatDialogRef<ImportRecipeComponent>
  ) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes (): void {
    this.recipesService.filter({})
    .subscribe(
      res => {
        this.recipes = res.items.sort((a,b) => this.foodToolService.sort(a,b));
        this.dataSource = [...this.recipes];
      },
      err => {
        console.log(err);
      }
    )
  }

  selectRecipe (recipe: RecipeModel): void {
    this.selected = recipe;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const cpy_data = [...this.recipes];
    this.dataSource = cpy_data.filter((recipe) =>  recipe.title.trim().toLowerCase().includes(filterValue.trim().toLowerCase()));
  }

  exit (): void {
    this.dialogRef.close();
  }

}
