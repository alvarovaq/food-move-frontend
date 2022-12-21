import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodsRoutingModule } from './foods-routing.module';
import { FoodsComponent } from '../foods/foods.component';
import { FoodsPageComponent } from './pages/foods-page/foods-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';
import { HeaderMeanComponent } from './components/header-mean/header-mean.component';
import { MeanComponent } from './components/mean/mean.component';
import { ItemFoodComponent } from './components/item-food/item-food.component';


@NgModule({
  declarations: [
    FoodsComponent,
    FoodsPageComponent,
    HeaderMeanComponent,
    MeanComponent,
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
