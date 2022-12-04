import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  async goToLogin(): Promise<void> {
    await this.router.navigate(['auth']);
  }

  async goToHome(): Promise<void> {
    await this.router.navigate(['home']);
  }

  async goToEmployees(): Promise<void> {
    await this.router.navigate(['home/employees']);
  }

  async goToRecipes(): Promise<void> {
    await this.router.navigate(['home/recipes']);
  }

  async goToRoutines(): Promise<void> {
    await this.router.navigate(['home/routines']);
  }

  async goToAddPatient(): Promise<void> {
    await this.router.navigate(['home/add-patient']);
  }

  async goToEditPatient(id: string): Promise<void> {
    await this.router.navigate(['home/edit-patient', id]);
  }

  async goToAddEmployee(): Promise<void> {
    await this.router.navigate(['home/add-employee']);
  }

  async goToEditEmployee(id: string): Promise<void> {
    await this.router.navigate(['home/edit-employee', id]);
  }

  async goToAddRecipe(): Promise<void> {
    await this.router.navigate(['home/add-recipe']);
  }

  async goToEditRecipe(id: string): Promise<void> {
    await this.router.navigate(['home/edit-recipe', id]);
  }

  async goToAddRoutine(): Promise<void> {
    await this.router.navigate(['home/add-routine']);
  }

  async goToEditRoutine(id: string): Promise<void> {
    await this.router.navigate(['home/edit-routine', id]);
  }

}
