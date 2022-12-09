import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { GraphicsPageComponent } from './pages/graphics-page/graphics-page.component';
import { PatientComponent } from './patient.component';


@NgModule({
  declarations: [
    GraphicsPageComponent,
    PatientComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
