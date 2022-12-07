import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '@core/models/recipe';
import { LoaderService } from '@core/services/loader.service';
import { RecipesService } from '@core/services/recipes.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { finalize, max } from 'rxjs/operators';
import { TypeFood } from '@core/enums/type-food';
import { SubtypeFood } from '@core/enums/subtype-food';
import { IngredientRequest } from '@core/models/ingredient-request';
import { RecipeRequest } from '@core/models/recipe-request';

@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.css', '../../../../shared/styles/form.css']
})
export class AddRecipePageComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  recipe: Recipe | null = null;

  links: Array<{id: number, url: string}> = [];
  ingredients: Array<{id: number, ingredient: IngredientRequest}> = [];

  availableTypeFood = [TypeFood.Desayuno, TypeFood.Comida, TypeFood.Cena];
  availableSubtypeFood = [SubtypeFood.Primero, SubtypeFood.Segundo, SubtypeFood.Postre];
  typeFood = TypeFood.Comida;
  subtypeFood = SubtypeFood.Primero;
  
  buttonClear = {
    title: false,
    description: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly recipesService: RecipesService,
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
      title: [this.edit ? this.recipe!.title : '', [Validators.required]],
      description: [this.edit ? this.recipe!.description : ''],
    });
    if (this.edit) {
      this.typeFood = this.recipe!.type;
      this.changeTypeFood();
      this.subtypeFood = this.recipe!.subtype;
      this.links = this.recipe!.links.map((url, id) => {
        return {id, url};
      });
      this.ingredients = this.recipe!.ingredients.map((ingredient, id) => {
        return {id, ingredient};
      });
    }
  }

  get title (): string {
    return this.form.value.title;
  }

  get description (): string {
    return this.form.value.description;
  } 

  clearField (field: string): void {
    this.form.value[field] = '';
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

  changeTypeFood (): void {
    switch (this.typeFood) {
      case TypeFood.Desayuno:
        this.availableSubtypeFood = [SubtypeFood.Principal];
        this.subtypeFood = SubtypeFood.Principal;
        break;
      case TypeFood.Comida:
        this.availableSubtypeFood = [SubtypeFood.Primero, SubtypeFood.Segundo, SubtypeFood.Postre];
        this.subtypeFood = SubtypeFood.Primero;
        break;
      case TypeFood.Cena:
        this.availableSubtypeFood = [SubtypeFood.Principal, SubtypeFood.Postre];
        this.subtypeFood = SubtypeFood.Principal;
        break;
      default:
        break;
    }
  }

  addRecipe(): void {
    this.loaderService.isLoading.next(true);
    const recipe = this.getRecipeRequest();
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
    const recipe = this.getRecipeRequest();
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

  getRecipeRequest (): RecipeRequest {
    return {
      title: this.title,
      description: this.description,
      type: this.typeFood,
      subtype: this.subtypeFood,
      links: this.links.map(link => {return link.url}),
      ingredients: this.ingredients.map(ingredient => {return ingredient.ingredient})
    };
  }

}
