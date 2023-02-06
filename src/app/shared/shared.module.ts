import { NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatModule } from './modules/mat/mat.module';
import { HeaderPatientComponent } from './components/header-patient/header-patient.component';
import { NamePipe } from './pipes/name.pipe';
import { OptionalPipe } from './pipes/optional.pipe';
import { SnackerService } from '@core/services/snacker.service';
import { DialogService } from '@core/services/dialog.service';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { TableComponent } from './components/table/table.component';
import { AdminPipe } from './pipes/admin.pipe';
import { PhotoPipe } from './pipes/photo.pipe';
import { InputProfileImageComponent } from './components/input-profile-image/input-profile-image.component';
import { EditProfileImageComponent } from './components/input-profile-image/components/edit-profile-image/edit-profile-image.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    NavbarComponent,
    SidenavComponent,
    HeaderPatientComponent,
    NamePipe,
    OptionalPipe,
    ProfilePictureComponent,
    TableComponent,
    AdminPipe,
    PhotoPipe,
    InputProfileImageComponent,
    EditProfileImageComponent
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
    ProfilePictureComponent,
    InputProfileImageComponent,
    TableComponent,
    NamePipe,
    OptionalPipe,
    PhotoPipe
  ],
  providers: [
    SnackerService,
    DialogService,
    NamePipe,
    OptionalPipe
  ]
})
export class SharedModule { }
