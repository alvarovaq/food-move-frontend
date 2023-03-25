import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DietsRoutingModule } from './diets-routing.module';
import { DietsPageComponent } from './pages/diets-page/diets-page.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '@shared/modules/mat/mat.module';
import { AddDietComponent } from './components/add-diet/add-diet.component';
import { EditDietPageComponent } from './pages/edit-diet-page/edit-diet-page.component';
import { AddRecipeForDietPageComponent } from './pages/add-recipe-for-diet-page/add-recipe-for-diet-page.component';
import { DietsComponent } from './diets.component';


@NgModule({
  declarations: [
    DietsComponent,
    DietsPageComponent,
    AddDietComponent,
    EditDietPageComponent,
    AddRecipeForDietPageComponent
  ],
  imports: [
    CommonModule,
    DietsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ]
})
export class DietsModule { }
