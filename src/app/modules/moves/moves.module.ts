import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovesRoutingModule } from './moves-routing.module';
import { MovesComponent } from '../moves/moves.component';
import { MovesPageComponent } from './pages/moves-page/moves-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';
import { AddMovePageComponent } from './pages/add-move-page/add-move-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MovesComponent,
    MovesPageComponent,
    AddMovePageComponent
  ],
  imports: [
    CommonModule,
    MovesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ]
})
export class MovesModule { }
