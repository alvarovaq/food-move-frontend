import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '@shared/constants';
import { RecipeModel } from '../models/recipe.model';
import { RecipeRequestModel } from '../models/recipe-request.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(
    private readonly http: HttpClient
  ) {}

  getRecipes (): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${API_ENDPOINT}/recipes/findAll`);
  }

  getRecipe (id: string): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(`${API_ENDPOINT}/recipes/findOne/${id}`);
  }

  createRecipe (recipe: RecipeRequestModel): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(`${API_ENDPOINT}/recipes/create`, recipe);
  } 

  updateRecipe (id: string, recipe: RecipeRequestModel): Observable<RecipeModel> {
    return this.http.patch<RecipeModel>(`${API_ENDPOINT}/recipes/update/${id}`, recipe);
  }

  removeRecipe (id: string): Observable<RecipeModel> {
    return this.http.delete<RecipeModel>(`${API_ENDPOINT}/recipes/remove/${id}`);
  }  

}
