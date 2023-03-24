import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { LoaderService } from '@core/services/loader.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { WeeklyDietsService } from '@core/services/weekly-diets.service';
import { weekdaysInit } from '@shared/components/weekly-calendar/constant/weekdays-init';
import { WeekdaySpn } from '@shared/components/weekly-calendar/enums/weekday';
import { WeekdayType } from '@shared/components/weekly-calendar/enums/weekday-type';
import { WeekdayItem } from '@shared/components/weekly-calendar/interfaces/weekday-item.interface';
import { finalize } from 'rxjs';
import { WeeklyDietModel } from '../../../../core/models/weekly-diet';

@Component({
  selector: 'app-edit-weekly-diet',
  templateUrl: './edit-weekly-diet.component.html',
  styleUrls: ['./edit-weekly-diet.component.css']
})
export class EditWeeklyDietComponent implements OnInit {

  weekdays: WeekdayItem[] = weekdaysInit;
  weekdayType = WeekdayType;

  weeklyDiet: WeeklyDietModel | null = null;

  constructor(
    private readonly weeklyDietsService: WeeklyDietsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.loaderService.isLoading.next(true);
      this.weeklyDietsService.getWeeklyDiet(params["id"])
      .pipe(finalize(() => {this.loaderService.isLoading.next(false)}))
      .subscribe(
        res => {
          this.weeklyDiet = res;
          this.initWeekdays();
        },
        err => {
          console.log(err);
          this.exit();
          this.snackerService.showError("No se ha encontrado la dieta semanal");
        }
      );
    } else {
      this.exit();
      this.snackerService.showError("No se ha encontrado la dieta semanal");
    }
  }

  initWeekdays (): void {
    this.weekdays = [
      {
        day: WeekdaySpn.Lunes,
        items: this.weeklyDiet!.monday,
        date: new Date()
      },
      {
        day: WeekdaySpn.Martes,
        items: this.weeklyDiet!.tuesday,
        date: new Date()
      },
      {
        day: WeekdaySpn.Miercoles,
        items: this.weeklyDiet!.wednesday,
        date: new Date()
      },
      {
        day: WeekdaySpn.Jueves,
        items: this.weeklyDiet!.thursday,
        date: new Date()
      },
      {
        day: WeekdaySpn.Viernes,
        items: this.weeklyDiet!.friday,
        date: new Date()
      },
      {
        day: WeekdaySpn.Sabado,
        items: this.weeklyDiet!.saturday,
        date: new Date()
      },
      {
        day: WeekdaySpn.Domingo,
        items: this.weeklyDiet!.sunday,
        date: new Date()
      }
    ];
  }

  exit (): void {
    this.routerService.goToWeeklyDiet();
  }

  addRecipe (weekday: WeekdayItem): void {}

  editRecipe (recipe: RecipeModel): void {}

  deleteRecipe (recipe: RecipeModel): void {}

}
