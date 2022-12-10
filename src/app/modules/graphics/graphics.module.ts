import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics-routing.module';
import { GraphicsComponent } from './graphics.component';
import { GraphicsPageComponent } from './pages/graphics-page/graphics-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MatModule } from '../../shared/modules/mat/mat.module';


@NgModule({
  declarations: [
    GraphicsComponent,
    GraphicsPageComponent
  ],
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    MatModule,
    SharedModule
  ]
})
export class GraphicsModule { }
