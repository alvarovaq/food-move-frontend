import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodsRoutingModule } from './foods-routing.module';
import { FoodsComponent } from '../foods/foods.component';
import { FoodsPageComponent } from './pages/foods-page/foods-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';
import { AddFoodPageComponent } from './pages/add-food-page/add-food-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FoodsComponent,
    FoodsPageComponent,
    AddFoodPageComponent
  ],
  imports: [
    CommonModule,
    FoodsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ]
})
export class FoodsModule { }
