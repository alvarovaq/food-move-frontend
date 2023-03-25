import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomQuery } from '@core/interfaces/custom-query';
import { CustomResponse } from '@core/interfaces/custom-response';
import { DietModel } from '@core/models/diet';
import { DietRequest } from '@core/models/diet-request.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DietsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getDiet (id: string): Observable<DietModel> {
    return this.http.get<DietModel>(`${environment.api}/diets/${id}`);
  }

  filter (customQuery: CustomQuery): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${environment.api}/diets/filter`, customQuery);
  }

  createDiet (dietRequest: DietRequest): Observable<DietModel> {
    return this.http.post<DietModel>(`${environment.api}/diets/create`, dietRequest);
  } 

  updateDiet (id: string, dietRequest : DietRequest): Observable<DietModel> {
    return this.http.patch<DietModel>(`${environment.api}/diets/update/${id}`, dietRequest);
  }

  removeDiet (id: string): Observable<DietModel> {
    return this.http.delete<DietModel>(`${environment.api}/diets/remove/${id}`);
  }  
  
}
