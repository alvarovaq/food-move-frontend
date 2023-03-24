import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from '@core/models/recipe.model';
import { LoaderService } from '@core/services/loader.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { WeeklyDietsService } from '@core/services/weekly-diets.service';
import { daysInit } from '@shared/components/weekly-calendar/constant/days-init';
import { DayOfWeek } from '@shared/components/weekly-calendar/enums/day-of-week';
import { WeeklyCalendarType } from '@shared/components/weekly-calendar/enums/weekly-calendar-type';
import { Day } from '@shared/components/weekly-calendar/interfaces/day';
import { finalize } from 'rxjs';
import { WeeklyDietModel } from '../../../../core/models/weekly-diet';

@Component({
  selector: 'app-edit-weekly-diet',
  templateUrl: './edit-weekly-diet.component.html',
  styleUrls: ['./edit-weekly-diet.component.css']
})
export class EditWeeklyDietComponent implements OnInit {

  days: Day[] = daysInit;
  weeklyCalendarType = WeeklyCalendarType;

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
          this.initDays();
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

  initDays (): void {
    this.days = [
      {
        day: DayOfWeek.Lunes,
        items: this.weeklyDiet!.monday,
        date: new Date()
      },
      {
        day: DayOfWeek.Martes,
        items: this.weeklyDiet!.tuesday,
        date: new Date()
      },
      {
        day: DayOfWeek.Miercoles,
        items: this.weeklyDiet!.wednesday,
        date: new Date()
      },
      {
        day: DayOfWeek.Jueves,
        items: this.weeklyDiet!.thursday,
        date: new Date()
      },
      {
        day: DayOfWeek.Viernes,
        items: this.weeklyDiet!.friday,
        date: new Date()
      },
      {
        day: DayOfWeek.Sabado,
        items: this.weeklyDiet!.saturday,
        date: new Date()
      },
      {
        day: DayOfWeek.Domingo,
        items: this.weeklyDiet!.sunday,
        date: new Date()
      }
    ];
  }

  exit (): void {
    this.routerService.goToWeeklyDiet();
  }

  addRecipe (weekday: Day): void {}

  editRecipe (recipe: RecipeModel): void {}

  deleteRecipe (recipe: RecipeModel): void {}

}
