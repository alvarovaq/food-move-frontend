import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutinesRoutingModule } from './routines-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SnackerService } from '@core/services/snacker.service';
import { DialogService } from '@core/services/dialog.service';
import { RoutinesComponent } from '../routines/routines.component';
import { RoutinesPageComponent } from './pages/routines-page/routines-page.component';
import { InfoRoutineComponent } from './components/info-routine/info-routine.component';
import { AddRoutinePageComponent } from './pages/add-routine-page/add-routine-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../../shared/modules/mat/mat.module';
import { OptionalPipe } from '../../shared/pipes/optional.pipe';


@NgModule({
  declarations: [
    RoutinesComponent,
    RoutinesPageComponent,
    InfoRoutineComponent,
    AddRoutinePageComponent
  ],
  imports: [
    CommonModule,
    RoutinesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ],
})
export class RoutinesModule { }
