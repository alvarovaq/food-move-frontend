import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovesComponent } from './moves.component';
import { MovesPageComponent } from './pages/moves-page/moves-page.component';

const routes: Routes = [
  {path: '', component: MovesComponent, children: [
    {path: ':id', component: MovesPageComponent},
    {path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovesRoutingModule { }
