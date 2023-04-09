import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { ConfigurationPageComponent } from './configuration-page/configuration-page.component';


@NgModule({
  declarations: [
    ConfigurationComponent,
    ConfigurationPageComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
