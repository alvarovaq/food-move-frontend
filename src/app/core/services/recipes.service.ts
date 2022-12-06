import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '@shared/constants';
import { Recipe } from '../models/recipe';
import { RecipeRequest } from '../models/recipe-request';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(
    private readonly http: HttpClient
  ) {}

  getRecipes (): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${API_ENDPOINT}/recipes/findAll`);
  }

  getRecipe (id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${API_ENDPOINT}/recipes/findOne/${id}`);
  }

  createRecipe (recipe: RecipeRequest): Observable<Recipe> {
    return this.http.post<Recipe>(`${API_ENDPOINT}/recipes/create`, recipe);
  } 

  updateRecipe (id: string, recipe: RecipeRequest): Observable<Recipe> {
    return this.http.patch<Recipe>(`${API_ENDPOINT}/recipes/update/${id}`, recipe);
  }

  removeRecipe (id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`${API_ENDPOINT}/recipes/remove/${id}`);
  }  

}
