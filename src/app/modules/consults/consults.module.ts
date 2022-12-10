import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultsRoutingModule } from './consults-routing.module';
import { ConsultsComponent } from '../consults/consults.component';
import { ConsultsPageComponent } from './pages/consults-page/consults-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ConsultsComponent,
    ConsultsPageComponent
  ],
  imports: [
    CommonModule,
    ConsultsRoutingModule,
    MatModule,
    SharedModule
  ]
})
export class ConsultsModule { }
