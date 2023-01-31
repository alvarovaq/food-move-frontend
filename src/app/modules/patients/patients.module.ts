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
import { MatModule } from '../../shared/modules/mat/mat.module';
import { OptionalPipe } from '../../shared/pipes/optional.pipe';
import { NamePipe } from '../../shared/pipes/name.pipe';


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
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class PatientsModule { }
