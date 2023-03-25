import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { LoaderService } from '@core/services/loader.service';
import { RecipesService } from '@core/services/recipes.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { finalize, max } from 'rxjs/operators';
import { Meal } from '@core/enums/meal';
import { Dish } from '@core/enums/dish';
import { IngredientRequestModel } from '@core/models/ingredient-request.model';
import { RecipeRequestModel } from '@core/models/recipe-request.model';
import { OptionalPipe } from '../../../../shared/pipes/optional.pipe';

@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.css', '../../../../../assets/styles/form.css']
})
export class AddRecipePageComponent implements OnInit {

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
    private readonly recipesService: RecipesService,
    private readonly optionalPipe: OptionalPipe,
    private readonly fb: FormBuilder,
    private readonly routerService: RouterService,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService
  ) {}

  ngOnInit(): void {
    this.loaderService.isLoading.next(true);
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.recipesService.getRecipe(params['id'])
      .pipe(finalize(() => {
        this.loaderService.isLoading.next(false);
      }))
      .subscribe(
        res => {
          this.edit = true;
          this.recipe = res;
          this.initForm();
        },
        err => {
          this.exit();
          this.snackerService.showError("Algo no ha sucedido como se esperaba");
        }
      );
    } else {
      this.initForm();
      this.loaderService.isLoading.next(false);
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

  addRecipe(): void {
    this.loaderService.isLoading.next(true);
    const recipe = this.getRecipeRequest();
    console.log(recipe);
    this.recipesService.createRecipe(recipe)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Receta creada con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  editRecipe(): void {
    this.loaderService.isLoading.next(true);
    const recipe = this.getRecipeRequest(true);
    this.recipesService.updateRecipe(this.recipe!._id, recipe)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Receta editada con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

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
