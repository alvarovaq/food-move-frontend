import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { ConfigurationPageComponent } from './pages/configuration-page/configuration-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { ChangePasswordSettingsComponent } from './components/change-password-settings/change-password-settings.component';


@NgModule({
  declarations: [
    ConfigurationComponent,
    ConfigurationPageComponent,
    ProfileSettingsComponent,
    ChangePasswordSettingsComponent
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
