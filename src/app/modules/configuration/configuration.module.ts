import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { ConfigurationPageComponent } from './configuration-page/configuration-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConfigurationComponent,
    ConfigurationPageComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    MatModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConfigurationModule { }
