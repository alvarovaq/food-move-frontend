import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from '../../core/models/recipe.model';
import { RecipeRequestModel } from '../../core/models/recipe-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(
    private readonly http: HttpClient
  ) {}

  getRecipes (): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(`${environment.api}/recipes/findAll`);
  }

  getRecipe (id: string): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(`${environment.api}/recipes/findOne/${id}`);
  }

  createRecipe (recipe: RecipeRequestModel): Observable<RecipeModel> {
    return this.http.post<RecipeModel>(`${environment.api}/recipes/create`, recipe);
  } 

  updateRecipe (id: string, recipe: RecipeRequestModel): Observable<RecipeModel> {
    return this.http.patch<RecipeModel>(`${environment.api}/recipes/update/${id}`, recipe);
  }

  removeRecipe (id: string): Observable<RecipeModel> {
    return this.http.delete<RecipeModel>(`${environment.api}/recipes/remove/${id}`);
  }  

}
