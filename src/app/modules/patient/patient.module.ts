import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';
import { MatModule } from '../../shared/modules/mat/mat.module';


@NgModule({
  declarations: [
    PatientPageComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    MatModule
  ]
})
export class PatientModule { }
