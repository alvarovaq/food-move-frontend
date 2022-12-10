import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodsRoutingModule } from './foods-routing.module';
import { FoodsComponent } from '../foods/foods.component';
import { FoodsPageComponent } from './pages/foods-page/foods-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    FoodsComponent,
    FoodsPageComponent
  ],
  imports: [
    CommonModule,
    FoodsRoutingModule,
    MatModule,
    SharedModule
  ]
})
export class FoodsModule { }
