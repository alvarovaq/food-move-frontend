import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultsComponent } from './consults.component';
import { ConsultsPageComponent } from './pages/consults-page/consults-page.component';
import { AddConsultPageComponent } from './pages/add-consult-page/add-consult-page.component';

const routes: Routes = [
  {path: '', component: ConsultsComponent, children: [
    {path: ':id', component: ConsultsPageComponent},
    {path: 'add-consult/:id', component: AddConsultPageComponent},
    {path: 'edit-consult/:id/:idcon', component: AddConsultPageComponent},
    {path: '**', redirectTo: ''}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultsRoutingModule { }
