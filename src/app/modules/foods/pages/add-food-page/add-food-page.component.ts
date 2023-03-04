import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '@core/enums/dish';
import { Mean } from '@core/enums/mean';
import { IngredientRequestModel } from '@core/models/ingredient-request.model';
import { RecipeRequestModel } from '@core/models/recipe-request.model';
import { RecipeModel } from '@core/models/recipe.model';
import { LoaderService } from '@core/services/loader.service';
import { RecipesService } from '@core/services/recipes.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { OptionalPipe } from '@shared/pipes/optional.pipe';
import { finalize } from 'rxjs';
import { ViewPatientService } from '../../../../core/services/view-patient.service';
import { PatientModel } from '../../../../core/models/patient.model';
import { FoodsService } from '../../../../core/services/foods.service';
import { FoodRequestModel } from '@core/models/food-request.model';
import { FoodModel } from '../../../../core/models/food.model';

@Component({
  selector: 'app-add-food-page',
  templateUrl: './add-food-page.component.html',
  styleUrls: ['./add-food-page.component.css', '../../../../../assets/styles/form.css']
})
export class AddFoodPageComponent implements OnInit {

  patient: PatientModel | null = null;

  date: Date = new Date();

  form!: FormGroup;
  edit: boolean = false;
  food: FoodModel | null = null;

  links: Array<{id: number, url: string}> = [];
  ingredients: Array<{id: number, ingredient: IngredientRequestModel}> = [];

  availableMean = [Mean.Desayuno, Mean.Comida, Mean.Cena];
  availableDish = [Dish.Primero, Dish.Segundo, Dish.Postre];
  mean: Mean = Mean.Comida;
  dish: Dish = Dish.Primero;
  
  buttonClear = {
    title: false,
    description: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly recipesService: RecipesService,
    private readonly foodsService: FoodsService,
    private readonly optionalPipe: OptionalPipe,
    private readonly fb: FormBuilder,
    private readonly routerService: RouterService,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService,
    private readonly viewPatientService: ViewPatientService
  ) {}

  ngOnInit(): void {
    this.viewPatientService.patient$
    .subscribe(
      res => {
        this.patient = res;
        const params = this.activatedRoute.snapshot.params;
        if (params["date"]) this.date = new Date(params["date"]);
        this.initForm();
      },
      err => {
        console.log(err);
        this.routerService.goToHome();
        this.snackerService.showError("No se ha encontrado al paciente");
      }
    )

  }

  initForm(): void {
    this.form = this.fb.group({
      title: [this.edit ? this.food!.title : null, [Validators.required]],
      description: [this.edit ? this.food!.description : null],
      comments: [this.edit ? this.food!.comments : null]
    });
    if (this.edit) {
      this.mean = this.food!.mean;
      this.changeMean();
      this.dish = this.food!.dish;
      this.links = this.food!.links.map((url, id) => {
        return {id, url};
      });
      this.ingredients = this.food!.ingredients.map((ingredient, id) => {
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

  get comments (): string | null {
    return this.form.value.comments;
  }

  clearField (field: string): void {
    this.form.value[field] = null;
    this.form.reset(this.form.value);
  }

  exit(): void {
    this.routerService.goToFoods();
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
      case Mean.Comida:
        this.availableDish = [Dish.Primero, Dish.Segundo, Dish.Postre];
        this.dish = Dish.Primero;
        break;
      case Mean.Cena:
        this.availableDish = [Dish.Principal, Dish.Postre];
        this.dish = Dish.Principal;
        break;
      default:
        break;
    }
  }

  addFood(): void {
    this.loaderService.isLoading.next(true);
    const foodRequest = this.getFoodRequest();
    console.log(foodRequest);
    this.foodsService.createFood(foodRequest)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Comida creada con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  editFood(): void {
    this.addFood();
    /*this.loaderService.isLoading.next(true);
    const recipe = this.getFoodRequest(true);
    this.recipesService.updateRecipe(this.food!._id, recipe)
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
    );*/
  }

  getFoodRequest (edit: boolean = false): FoodRequestModel {
    const request = {
      patient: this.patient?._id,
      date: this.date,
      title: this.title,
      description: this.description,
      comments: this.comments,
      mean: this.mean,
      dish: this.dish,
      links: this.links.map(link => {return link.url}),
      ingredients: this.ingredients.map(ingredient => {return ingredient.ingredient})
    }; 
    return edit ? request : this.optionalPipe.transform(request);
  }

}
