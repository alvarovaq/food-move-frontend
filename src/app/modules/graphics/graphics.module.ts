import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics-routing.module';
import { GraphicsComponent } from './graphics.component';
import { GraphicsPageComponent } from './pages/graphics-page/graphics-page.component';


@NgModule({
  declarations: [
    GraphicsComponent,
    GraphicsPageComponent
  ],
  imports: [
    CommonModule,
    GraphicsRoutingModule
  ]
})
export class GraphicsModule { }
