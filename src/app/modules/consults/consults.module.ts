import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultsRoutingModule } from './consults-routing.module';
import { ConsultsComponent } from '../consults/consults.component';
import { ConsultsPageComponent } from './pages/consults-page/consults-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';
import { AddConsultPageComponent } from './pages/add-consult-page/add-consult-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoConsultComponent } from './components/info-consult/info-consult.component';


@NgModule({
  declarations: [
    ConsultsComponent,
    ConsultsPageComponent,
    AddConsultPageComponent,
    InfoConsultComponent
  ],
  imports: [
    CommonModule,
    ConsultsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ]
})
export class ConsultsModule { }
