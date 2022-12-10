import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './modules/mat/mat.module';
import { HeaderPatientComponent } from './components/header-patient/header-patient.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NavbarComponent,
    SidenavComponent,
    HeaderPatientComponent
  ],
  imports: [
    CommonModule,
    MatModule
  ],
  exports: [
    ConfirmDialogComponent,
    NavbarComponent,
    SidenavComponent,
    HeaderPatientComponent
  ]
})
export class SharedModule { }
