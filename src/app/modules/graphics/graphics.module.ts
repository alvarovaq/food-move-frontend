import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics-routing.module';
import { GraphicsComponent } from './graphics.component';
import { GraphicsPageComponent } from './pages/graphics-page/graphics-page.component';
import { SharedModule } from '../../shared/shared.module';
import { MatModule } from '../../shared/modules/mat/mat.module';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GraphicsComponent,
    GraphicsPageComponent
  ],
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgChartsModule
  ]
})
export class GraphicsModule { }
