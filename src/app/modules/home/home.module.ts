import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from '@shared/material.module';
import { PatientsComponent } from './pages/patients/patients.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RoutinesComponent } from './pages/routines/routines.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AddPatientComponent } from './pages/add-patient/add-patient.component';
import { SnackerService } from '@core/services/snacker.service';
import { DialogService } from '@core/services/dialog.service';
import { InfoPatientComponent } from './pages/patients/info-patient/info-patient.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { InfoEmployeeComponent } from './pages/employees/info-employee/info-employee.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { InfoRecipeComponent } from './pages/recipes/info-recipe/info-recipe.component';
import { AddRoutineComponent } from './pages/add-routine/add-routine.component';
import { InfoRoutineComponent } from './pages/routines/info-routine/info-routine.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    PatientsComponent,
    EmployeesComponent,
    RecipesComponent,
    RoutinesComponent,
    SidenavComponent,
    AddPatientComponent,
    InfoPatientComponent,
    AddEmployeeComponent,
    InfoEmployeeComponent,
    AddRecipeComponent,
    InfoRecipeComponent,
    AddRoutineComponent,
    InfoRoutineComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SnackerService,
    DialogService,
    DatePipe
  ]
})
export class HomeModule { }
