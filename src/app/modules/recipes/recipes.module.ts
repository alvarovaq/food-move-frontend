import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { SharedModule } from '@shared/shared.module';
import { InfoRecipeComponent } from './components/info-recipe/info-recipe.component';
import { SnackerService } from '@shared/services/snacker.service';
import { DialogService } from '@shared/services/dialog.service';
import { AddRecipePageComponent } from './pages/add-recipe-page/add-recipe-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../../shared/modules/mat/mat.module';
import { OptionalPipe } from '../../shared/pipes/optional.pipe';


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
})
export class RecipesModule { }
