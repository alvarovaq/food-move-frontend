import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeeklyDietsPageComponent } from './pages/weekly-diets-page/weekly-diets-page.component';
import { WeeklyDietsComponent } from './weekly-diets.component';

const routes: Routes = [
  { path: '', component: WeeklyDietsComponent, children: [
    { path: '', component: WeeklyDietsPageComponent},
    { path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeeklyDietsRoutingModule { }
