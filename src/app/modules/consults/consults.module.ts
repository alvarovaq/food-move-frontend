import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultsRoutingModule } from './consults-routing.module';
import { ConsultsComponent } from '../consults/consults.component';
import { ConsultsPageComponent } from './pages/consults-page/consults-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';
import { AddConsultPageComponent } from './pages/add-consult-page/add-consult-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackerService } from '@core/services/snacker.service';
import { OptionalPipe } from '../../shared/pipes/optional.pipe';


@NgModule({
  declarations: [
    ConsultsComponent,
    ConsultsPageComponent,
    AddConsultPageComponent
  ],
  imports: [
    CommonModule,
    ConsultsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ],
  providers: [
    SnackerService
  ]
})
export class ConsultsModule { }
