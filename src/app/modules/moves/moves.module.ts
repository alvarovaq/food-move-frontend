import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovesRoutingModule } from './moves-routing.module';
import { MovesComponent } from '../moves/moves.component';
import { MovesPageComponent } from './pages/moves-page/moves-page.component';
import { MatModule } from '@shared/modules/mat/mat.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    MovesComponent,
    MovesPageComponent
  ],
  imports: [
    CommonModule,
    MovesRoutingModule,
    MatModule,
    SharedModule
  ]
})
export class MovesModule { }
