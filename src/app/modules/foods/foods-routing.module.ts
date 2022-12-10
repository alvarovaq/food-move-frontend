import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodsComponent } from './foods.component';
import { FoodsPageComponent } from './pages/foods-page/foods-page.component';

const routes: Routes = [
  {path: '', component: FoodsComponent, children: [
    {path: ':id', component: FoodsPageComponent},
    {path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule { }
