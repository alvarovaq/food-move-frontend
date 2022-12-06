import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';
import { HomeComponent } from './home.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { AddPatientComponent } from './pages/add-patient/add-patient.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RoutinesComponent } from './pages/routines/routines.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { AddRoutineComponent } from './pages/add-routine/add-routine.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: '', component: PatientsComponent},
    { path: 'employees', component: EmployeesComponent, canActivate: [AdminGuard]},
    { path: 'recipes', component: RecipesComponent},
    { path: 'routines', component: RoutinesComponent},
    { path: 'add-patient', component: AddPatientComponent},
    { path: 'edit-patient/:id', component: AddPatientComponent},
    { path: 'add-employee', component: AddEmployeeComponent},
    { path: 'edit-employee/:id', component: AddEmployeeComponent},
    { path: 'add-recipe', component: AddRecipeComponent},
    { path: 'edit-recipe/:id', component: AddRecipeComponent},
    { path: 'add-routine', component: AddRoutineComponent},
    { path: 'edit-routine/:id', component: AddRoutineComponent},
    { path: '**', redirectTo: ''}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
