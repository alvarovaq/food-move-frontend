import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientPageComponent } from './pages/patient-page/patient-page.component';

const routes: Routes = [
  {path:'', component: PatientPageComponent, children: [
    {path: '', loadChildren: () => import('@modules/graphics/graphics.module').then(x => x.GraphicsModule)},
    {path: '**', redirectTo:''}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
