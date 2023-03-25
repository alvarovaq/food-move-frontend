import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DayOfWeek } from '@core/enums/day-of-week';
import { Dish } from '@core/enums/dish';
import { Meal } from '@core/enums/meal';
import { DietModel } from '@core/models/diet';
import { IngredientRequestModel } from '@core/models/ingredient-request.model';
import { RecipeRequestModel } from '@core/models/recipe-request.model';
import { RecipeModel } from '@core/models/recipe.model';
import { DietsService } from '@core/services/diets.service';
import { LoaderService } from '@core/services/loader.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { OptionalPipe } from '@shared/pipes/optional.pipe';
import { finalize } from 'rxjs'; 

@Component({
  selector: 'app-add-recipe-for-diet-page',
  templateUrl: './add-recipe-for-diet-page.component.html',
  styleUrls: ['./add-recipe-for-diet-page.component.css', '../../../../../assets/styles/form.css']
})
export class AddRecipeForDietPageComponent implements OnInit {

  diet: DietModel | null = null;
  day: DayOfWeek | null = null;

  form!: FormGroup;
  edit: boolean = false;
  recipe: RecipeModel | null = null;

  links: Array<{id: number, url: string}> = [];
  ingredients: Array<{id: number, ingredient: IngredientRequestModel}> = [];

  availableMeal = [Meal.Desayuno, Meal.Almuerzo, Meal.Merienda, Meal.Cena];
  availableDish = [Dish.Primero, Dish.Segundo, Dish.Postre];
  meal: Meal = Meal.Almuerzo;
  dish: Dish = Dish.Primero;
  
  buttonClear = {
    title: false,
    description: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly dietsService: DietsService,
    private readonly optionalPipe: OptionalPipe,
    private readonly fb: FormBuilder,
    private readonly routerService: RouterService,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["dietId"]) {
      this.loaderService.isLoading.next(true);
      this.dietsService.getDiet(params["dietId"])
      .pipe(finalize(() => this.loaderService.isLoading.next(false)))
      .subscribe(
        res => {
          this.diet = res;
          this.day = params["day"];
          console.log(this.day);
          if (params["recipeId"]) {
            this.edit = true;
            // ...
          } else {
            this.edit = false;
            this.initForm();
          }
        },
        err => {
          console.log(err);
          this.snackerService.showError("No se ha encontrado la dieta");
        }
      );
    } else {
      this.exit();
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      title: [this.edit ? this.recipe!.title : null, [Validators.required]],
      description: [this.edit ? this.recipe!.description : null],
    });
    if (this.edit) {
      this.meal = this.recipe!.meal;
      this.changeMeal();
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
    this.routerService.goToEditDiet(this.diet?._id || "noid");
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

  changeMeal (): void {
    switch (this.meal) {
      case Meal.Desayuno:
        this.availableDish = [Dish.Principal];
        this.dish = Dish.Principal;
        break;
      case Meal.Almuerzo:
        this.availableDish = [Dish.Primero, Dish.Segundo, Dish.Postre];
        this.dish = Dish.Primero;
        break;
      case Meal.Merienda:
          this.availableDish = [Dish.Principal];
          this.dish = Dish.Principal;
          break;
      case Meal.Cena:
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
      meal: this.meal,
      dish: this.dish,
      links: this.links.map(link => {return link.url}),
      ingredients: this.ingredients.map(ingredient => {return ingredient.ingredient})
    }; 
    return edit ? request : this.optionalPipe.transform(request);
  }

}
