import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '@core/enums/dish';
import { Meal } from '@core/enums/meal';
import { IngredientRequestModel } from '@core/models/ingredient-request.model';
import { RecipeModel } from '@core/models/recipe.model';
import { LoaderService } from '@core/services/loader.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { OptionalPipe } from '@shared/pipes/optional.pipe';
import { finalize } from 'rxjs';
import { ViewPatientService } from '@core/services/view-patient.service';
import { PatientModel } from '@core/models/patient.model';
import { FoodsService } from '@core/services/foods.service';
import { FoodRequestModel } from '@core/models/food-request.model';
import { FoodModel } from '@core/models/food.model';
import { MatDialog } from '@angular/material/dialog';
import { ImportType } from '@shared/components/import-dialog/enums/import-type';
import { ImportDialogComponent } from '@shared/components/import-dialog/import-dialog.component';
import { LinkStructure } from '@shared/components/links-input/interfaces/link-structure';
import { IngredientStructure } from '@shared/components/ingredients-input/interfaces/ingredient-structure';
import { AttachmentModel } from '@core/models/attachment.model';
import { AttachmentsService } from '@core/services/attachments.service';
import { VideoStructure } from '@shared/components/videos-input/interfaces/video-structure';
import { getDateUTC } from '@core/utils/date-utils';

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

  links: Array<LinkStructure> = [];
  videos: Array<VideoStructure> = [];
  ingredients: Array<IngredientStructure> = [];
  attachment: AttachmentModel | null = null;

  availableMeal = [Meal.Desayuno, Meal.Almuerzo, Meal.Merienda, Meal.Cena];
  availableDish = [Dish.Primero, Dish.Segundo, Dish.Postre];
  meal: Meal = Meal.Almuerzo;
  dish: Dish = Dish.Primero;
  
  buttonClear = {
    title: false,
    description: false,
    comments: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly foodsService: FoodsService,
    private readonly attachmentsService: AttachmentsService,
    private readonly optionalPipe: OptionalPipe,
    private readonly fb: FormBuilder,
    private readonly routerService: RouterService,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService,
    private readonly viewPatientService: ViewPatientService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.viewPatientService.patient$
    .subscribe(
      res => {
        this.patient = res;
        const params = this.activatedRoute.snapshot.params;
        if (params["date"]) this.date = getDateUTC(new Date(params["date"]));
        if (params["id"]) {
          this.edit = true;
          this.loaderService.isLoading.next(true);
          this.foodsService.getFood(params["id"])
          .pipe(finalize(() => this.loaderService.isLoading.next(false)))
          .subscribe(
            res => {
              this.food = res;
              this.date = res.date;
              this.initForm();
            },
            err => {
              console.log(err);
            }
          );
        } else {
          this.initForm();
        }
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
      this.meal = this.food!.meal;
      this.changeMeal();
      this.dish = this.food!.dish;
      this.links = this.food!.links.map((url, id) => {
        return {id, url};
      }) || [];
      this.videos = this.food!.videos.map((url, id) => {
        return {id, url};
      }) || [];
      this.ingredients = this.food!.ingredients.map((ingredient, id) => {
        return {id, ingredient};
      }) || [];
      if (this.food?.attachment) {
        this.loaderService.isLoading.next(true);
        this.attachmentsService.getAttachment(this.food.attachment)
        .pipe(finalize(() => this.loaderService.isLoading.next(false)))
        .subscribe(
          res => {
            this.attachment = res;
          },
          err => {
            this.attachment = null;
            console.log(err);
          }
        );
      } else {
        this.attachment = null;
      }
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
    this.routerService.goToFoods(this.date);
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

  importRecipe (): void {
    const dialogRef = this.dialog.open(ImportDialogComponent, {
      width: '800px',
      data: ImportType.Recipe
    });
    dialogRef.afterClosed()
    .subscribe(
      res => {
        if (res) {
          const recipe = res as RecipeModel;
          this.form.setValue({title: recipe.title, description: recipe.description ? recipe.description : '', comments: this.comments});
          this.meal = recipe.meal;
          this.changeMeal();
          this.dish = recipe.dish;
          this.links = recipe.links.map((url, id) => {
            return {id, url};
          }) || [];
          this.videos = recipe.videos.map((url, id) => {
            return {id, url};
          }) || [];
          this.ingredients = recipe.ingredients.map((ingredient, id) => {
            return {id, ingredient};
          }) || [];
          if (recipe.attachment) {
            this.loaderService.isLoading.next(true);
            this.attachmentsService.getAttachment(recipe.attachment)
            .pipe(finalize(() => this.loaderService.isLoading.next(false)))
            .subscribe(
              res => {
                this.attachment = res;
              },
              err => {
                this.attachment = null;
                console.log(err);
              }
            );
          } else {
            this.attachment = null;
          }
        }
      },
      err => {
        console.log(err);
      }
    );
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
    this.loaderService.isLoading.next(true);
    const food = this.getFoodRequest(true);
    this.foodsService.updateFood(this.food!._id, food)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Comida editada con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.err.message);
      }
    );
  }

  getFoodRequest (edit: boolean = false): FoodRequestModel {
    const request = {
      patient: this.patient?._id,
      date: this.date,
      title: this.title,
      description: this.description,
      comments: this.comments,
      meal: this.meal,
      dish: this.dish,
      links: this.links.map(link => link.url),
      videos: this.videos.map(video => video.url),
      ingredients: this.ingredients.map(ingredient => ingredient.ingredient),
      attachment: this.attachment ? this.attachment._id : null
    }; 
    return edit ? request : this.optionalPipe.transform(request);
  }

}
