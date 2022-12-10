import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'patients', pathMatch: 'full'},
  {path: 'patients', loadChildren: () => import('@modules/patients/patients.module').then(x => x.PatientsModule)},
  {path: 'employees', loadChildren: () => import('@modules/employees/employees.module').then(x => x.EmployeesModule), canActivate: [AdminGuard]},
  {path: 'recipes', loadChildren: () => import('@modules/recipes/recipes.module').then(x => x.RecipesModule)},
  {path: 'routines', loadChildren: () => import('@modules/routines/routines.module').then(x => x.RoutinesModule)},
  {path: 'patient', loadChildren: () => import('@modules/patient/patient.module').then(x => x.PatientModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
