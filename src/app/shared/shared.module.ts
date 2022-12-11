import { NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatModule } from './modules/mat/mat.module';
import { HeaderPatientComponent } from './components/header-patient/header-patient.component';
import { NamePipe } from './pipes/name.pipe';
import { OptionalPipe } from './pipes/optional.pipe';
import { SnackerService } from '@shared/services/snacker.service';
import { DialogService } from '@shared/services/dialog.service';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NavbarComponent,
    SidenavComponent,
    HeaderPatientComponent,
    NamePipe,
    OptionalPipe
  ],
  imports: [
    CommonModule,
    MatModule
  ],
  exports: [
    ConfirmDialogComponent,
    NavbarComponent,
    SidenavComponent,
    HeaderPatientComponent,
    NamePipe,
    OptionalPipe
  ],
  providers: [
    SnackerService,
    DialogService,
    NamePipe,
    OptionalPipe
  ]
})
export class SharedModule { }
