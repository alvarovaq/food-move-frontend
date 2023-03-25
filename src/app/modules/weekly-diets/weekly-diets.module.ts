import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeeklyDietsRoutingModule } from './weekly-diets-routing.module';
import { WeeklyDietsPageComponent } from './pages/weekly-diets-page/weekly-diets-page.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '@shared/modules/mat/mat.module';
import { AddWeeklyDietComponent } from './components/add-weekly-diet/add-weekly-diet.component';
import { EditWeeklyDietComponent } from './pages/edit-weekly-diet/edit-weekly-diet.component';
import { AddDietRecipePageComponent } from './pages/add-diet-recipe-page/add-diet-recipe-page.component';


@NgModule({
  declarations: [
    WeeklyDietsPageComponent,
    AddWeeklyDietComponent,
    EditWeeklyDietComponent,
    AddDietRecipePageComponent
  ],
  imports: [
    CommonModule,
    WeeklyDietsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ]
})
export class WeeklyDietsModule { }
