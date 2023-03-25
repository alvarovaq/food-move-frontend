import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '@core/enums/dish';
import { Mean } from '@core/enums/mean';
import { IngredientRequestModel } from '@core/models/ingredient-request.model';
import { RecipeRequestModel } from '@core/models/recipe-request.model';
import { RecipeModel } from '@core/models/recipe.model';
import { LoaderService } from '@core/services/loader.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { WeeklyDietsService } from '@core/services/weekly-diets.service';
import { OptionalPipe } from '@shared/pipes/optional.pipe';

@Component({
  selector: 'app-add-diet-recipe-page',
  templateUrl: './add-diet-recipe-page.component.html',
  styleUrls: ['./add-diet-recipe-page.component.css', '../../../../../assets/styles/form.css']
})
export class AddDietRecipePageComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  recipe: RecipeModel | null = null;

  links: Array<{id: number, url: string}> = [];
  ingredients: Array<{id: number, ingredient: IngredientRequestModel}> = [];

  availableMean = [Mean.Desayuno, Mean.Almuerzo, Mean.Merienda, Mean.Cena];
  availableDish = [Dish.Primero, Dish.Segundo, Dish.Postre];
  mean: Mean = Mean.Almuerzo;
  dish: Dish = Dish.Primero;
  
  buttonClear = {
    title: false,
    description: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly weeklyDietsService: WeeklyDietsService,
    private readonly optionalPipe: OptionalPipe,
    private readonly fb: FormBuilder,
    private readonly routerService: RouterService,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService
  ) {}

  ngOnInit(): void {}

  initForm(): void {
    this.form = this.fb.group({
      title: [this.edit ? this.recipe!.title : null, [Validators.required]],
      description: [this.edit ? this.recipe!.description : null],
    });
    if (this.edit) {
      this.mean = this.recipe!.mean;
      this.changeMean();
      this.dish = this.recipe!.dish;
      this.links = this.recipe!.links.map((url, id) => {
        return {id, url};
      });
      this.ingredients = this.recipe!.ingredients.map((ingredient, id) => {
        return {id, ingredient};
      });
    }
  }

  get title (): string | null {
    return this.form.value.title;
  }

  get description (): string | null {
    return this.form.value.description;
  } 

  clearField (field: string): void {
    this.form.value[field] = null;
    this.form.reset(this.form.value);
  }

  exit(): void {
    this.routerService.goToRecipes();
  }

  addLink(url: string): void {
    const id = this.links.length > 0 ? Math.max(...this.links.map(link => {return link.id})) + 1 : 0;
    const link = {id, url};
    this.links.push(link);
  }

  removeLink(id: number): void {
    this.links = this.links.filter(link => {
      return link.id != id;
    });
  }

  addIngredient(name: string, quantity: number, unit: string): void {
    const id = this.ingredients.length > 0 ? Math.max(...this.ingredients.map(ingredient => {return ingredient.id})) + 1 : 0;
    const ingredient = {id, ingredient: {name, quantity, unit}};
    this.ingredients.push(ingredient);
  } 

  removeIngredient(id: number): void {
    this.ingredients = this.ingredients.filter(ingredient => {
      return ingredient.id != id;
    });
  }

  changeMean (): void {
    switch (this.mean) {
      case Mean.Desayuno:
        this.availableDish = [Dish.Principal];
        this.dish = Dish.Principal;
        break;
      case Mean.Almuerzo:
        this.availableDish = [Dish.Primero, Dish.Segundo, Dish.Postre];
        this.dish = Dish.Primero;
        break;
      case Mean.Merienda:
          this.availableDish = [Dish.Principal];
          this.dish = Dish.Principal;
          break;
      case Mean.Cena:
        this.availableDish = [Dish.Principal, Dish.Postre];
        this.dish = Dish.Principal;
        break;
      default:
        break;
    }
  }

  addRecipe(): void {}

  editRecipe(): void {}

  getRecipeRequest (edit: boolean = false): RecipeRequestModel {
    const request = {
      title: this.title,
      description: this.description,
      mean: this.mean,
      dish: this.dish,
      links: this.links.map(link => {return link.url}),
      ingredients: this.ingredients.map(ingredient => {return ingredient.ingredient})
    }; 
    return edit ? request : this.optionalPipe.transform(request);
  }

}
