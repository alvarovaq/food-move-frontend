import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodsRoutingModule } from './foods-routing.module';
import { FoodsComponent } from '../foods/foods.component';
import { FoodsPageComponent } from './pages/foods-page/foods-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';
import { HeaderTypeFoodComponent } from './components/header-type-food/header-type-food.component';
import { TypeFoodComponent } from './components/type-food/type-food.component';
import { ItemFoodComponent } from './components/item-food/item-food.component';


@NgModule({
  declarations: [
    FoodsComponent,
    FoodsPageComponent,
    HeaderTypeFoodComponent,
    TypeFoodComponent,
    ItemFoodComponent
  ],
  imports: [
    CommonModule,
    FoodsRoutingModule,
    MatModule,
    SharedModule
  ]
})
export class FoodsModule { }
