import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsPageComponent } from './pages/patients-page/patients-page.component';
import { InfoPatientComponent } from './components/info-patient/info-patient.component';
import { SnackerService } from '@core/services/snacker.service';
import { DialogService } from '@core/services/dialog.service';
import { PatientsComponent } from '../patients/patients.component';
import { AddPatientPageComponent } from './pages/add-patient-page/add-patient-page.component';


@NgModule({
  declarations: [
    PatientsComponent,
    PatientsPageComponent,
    InfoPatientComponent,
    AddPatientPageComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModule
  ],
  providers: [
    SnackerService,
    DialogService,
    DatePipe
  ]
})
export class PatientsModule { }
