import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WeeklyDietRequest } from '@core/models/weekly-diet-request.model';
import { LoaderService } from '@core/services/loader.service';
import { RouterService } from '@core/services/router.service';
import { WeeklyDietsService } from '@core/services/weekly-diets.service';
import { OptionalPipe } from '@shared/pipes/optional.pipe';
import { finalize } from 'rxjs';
import { WeeklyDietModel } from '../../../../core/models/weekly-diet';

@Component({
  selector: 'app-add-weekly-diet',
  templateUrl: './add-weekly-diet.component.html',
  styleUrls: ['./add-weekly-diet.component.css']
})
export class AddWeeklyDietComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private readonly dialogRef: MatDialogRef<AddWeeklyDietComponent>,
    private readonly fb: FormBuilder,
    private readonly optionalPipe: OptionalPipe,
    private readonly weeklyDietService: WeeklyDietsService,
    private readonly loaderService: LoaderService,
    private readonly routerService: RouterService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      description: [null]
    });
  }

  get title (): string | null {
    return this.form.value.title;
  }

  get description (): string | null {
    return this.form.value.description;
  }

  addWeeklyDiet (): void {
    const weeklyDiet = this.getWeeklyDietRequest();
    this.loaderService.isLoading.next(true);
    this.weeklyDietService.createWeeklyDiet(weeklyDiet)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe(
      res => {
        this.routerService.goToEditWeeklyDiet(res._id);
      },
      err => {
        console.log(err);
      }
    );
  }

  getWeeklyDietRequest (): WeeklyDietRequest {
    const request = {
      title: this.title,
      description: this.description,
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    };
    return this.optionalPipe.transform(request);
  }

}
