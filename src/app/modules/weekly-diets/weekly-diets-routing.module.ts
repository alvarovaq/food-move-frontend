import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDietRecipePageComponent } from './pages/add-diet-recipe-page/add-diet-recipe-page.component';
import { EditWeeklyDietComponent } from './pages/edit-weekly-diet/edit-weekly-diet.component';
import { WeeklyDietsPageComponent } from './pages/weekly-diets-page/weekly-diets-page.component';
import { WeeklyDietsComponent } from './weekly-diets.component';

const routes: Routes = [
  { path: '', component: WeeklyDietsComponent, children: [
    { path: '', component: WeeklyDietsPageComponent},
    { path: 'edit-weekly-diet/:dietId', component: EditWeeklyDietComponent},
    { path: 'edit-weekly-diet/:dietId/add-recipe/:day', component: AddDietRecipePageComponent},
    { path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeeklyDietsRoutingModule { }
