import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeeklyDietsRoutingModule } from './weekly-diets-routing.module';
import { WeeklyDietsPageComponent } from './pages/weekly-diets-page/weekly-diets-page.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '@shared/modules/mat/mat.module';


@NgModule({
  declarations: [
    WeeklyDietsPageComponent
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
