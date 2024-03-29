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
import { MovePipe } from './pipes/move.pipe';
import { WeeklyCalendarComponent } from './components/weekly-calendar/weekly-calendar.component';
import { ImportDialogComponent } from './components/import-dialog/import-dialog.component';
import { AttachmentsDialogComponent } from './components/attachments-dialog/attachments-dialog.component';
import { AttachmentInputComponent } from './components/attachment-input/attachment-input.component';
import { IngredientsInputComponent } from './components/ingredients-input/ingredients-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinksInputComponent } from './components/links-input/links-input.component';
import { AddAttachmentComponent } from './components/add-attachment/add-attachment.component';
import { VideosInputComponent } from './components/videos-input/videos-input.component';
import { RatingScrPipe } from './pipes/rating-scr.pipe';
import { FoodBackgroundPipe } from './pipes/food-background.pipe';
import { FoodIconPipe } from './pipes/food-icon.pipe';
import { FoodSortPipe } from './pipes/food-sort.pipe';
import { GraphicComponent } from './components/graphic/graphic.component';
import { NgChartsModule } from 'ng2-charts';

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
    EditProfileImageComponent,
    MovePipe,
    WeeklyCalendarComponent,
    ImportDialogComponent,
    AttachmentsDialogComponent,
    AttachmentInputComponent,
    IngredientsInputComponent,
    LinksInputComponent,
    AddAttachmentComponent,
    VideosInputComponent,
    RatingScrPipe,
    FoodBackgroundPipe,
    FoodIconPipe,
    FoodSortPipe,
    GraphicComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  exports: [
    ConfirmDialogComponent,
    NavbarComponent,
    SidenavComponent,
    HeaderPatientComponent,
    ProfilePictureComponent,
    InputProfileImageComponent,
    TableComponent,
    WeeklyCalendarComponent,
    AttachmentInputComponent,
    IngredientsInputComponent,
    LinksInputComponent,
    VideosInputComponent,
    NamePipe,
    OptionalPipe,
    PhotoPipe,
    RatingScrPipe,
    FoodBackgroundPipe,
    FoodIconPipe,
    FoodSortPipe,
    GraphicComponent
  ],
  providers: [
    SnackerService,
    DialogService,
    NamePipe,
    OptionalPipe
  ]
})
export class SharedModule { }
