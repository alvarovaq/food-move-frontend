import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DietsComponent } from './diets.component';
import { AddRecipeForDietPageComponent } from './pages/add-recipe-for-diet-page/add-recipe-for-diet-page.component';
import { DietsPageComponent } from './pages/diets-page/diets-page.component';
import { EditDietPageComponent } from './pages/edit-diet-page/edit-diet-page.component';

const routes: Routes = [
  { path: '', component: DietsComponent, children: [
    { path: '', component: DietsPageComponent},
    { path: 'edit-diet/:dietId', component: EditDietPageComponent},
    { path: 'edit-diet/:dietId/add-recipe/:day', component: AddRecipeForDietPageComponent},
    { path: 'edit-diet/:dietId/edit-recipe/:day/:recipeId', component: AddRecipeForDietPageComponent},
    { path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietsRoutingModule { }
