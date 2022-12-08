import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { SharedModule } from '@shared/shared.module';
import { InfoRecipeComponent } from './components/info-recipe/info-recipe.component';
import { SnackerService } from '@core/services/snacker.service';
import { DialogService } from '@core/services/dialog.service';
import { AddRecipePageComponent } from './pages/add-recipe-page/add-recipe-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../../shared/modules/mat/mat.module';


@NgModule({
  declarations: [
    RecipesPageComponent,
    RecipesComponent,
    InfoRecipeComponent,
    AddRecipePageComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ],
  providers: [
    SnackerService,
    DialogService
  ]
})
export class RecipesModule { }
