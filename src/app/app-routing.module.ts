import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AutoLoginGuard } from './core/guards/auto-login.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent, loadChildren: () => import('@modules/home/home.module').then(x => x.HomeModule), canLoad: [AuthGuard]},
  {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(x => x.AuthModule), canLoad: [AutoLoginGuard]},
  /*{path: 'patients', loadChildren: () => import('./modules/patients/patients.module').then(x => x.PatientsModule), canLoad: [AuthGuard]},
  {path: 'employees', loadChildren: () => import('./modules/employees/employees.module').then(x => x.EmployeesModule), canLoad: [AuthGuard]},
  {path: 'recipes', loadChildren: () => import('./modules/recipes/recipes.module').then(x => x.RecipesModule), canLoad: [AuthGuard]},
  {path: 'routines', loadChildren: () => import('./modules/routines/routines.module').then(x => x.RoutinesModule), canLoad: [AuthGuard]},*/
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
