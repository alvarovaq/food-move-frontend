import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomQuery } from '@core/interfaces/custom-query';
import { CustomResponse } from '@core/interfaces/custom-response';
import { WeeklyDietModel } from '@core/models/weekly-diet';
import { WeeklyDietRequest } from '@core/models/weekly-diet-request.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeeklyDietsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getWeeklyDiet (id: string): Observable<WeeklyDietModel> {
    return this.http.get<WeeklyDietModel>(`${environment.api}/weekly-diet/${id}`);
  }

  filter (customQuery: CustomQuery): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${environment.api}/weekly-diet/filter`, customQuery);
  }

  createWeeklyDiet (weeklyDietRequest: WeeklyDietRequest): Observable<WeeklyDietModel> {
    return this.http.post<WeeklyDietModel>(`${environment.api}/weekly-diet/create`, weeklyDietRequest);
  } 

  updateWeeklyDiet (id: string, weeklyDietRequest: WeeklyDietRequest): Observable<WeeklyDietModel> {
    return this.http.patch<WeeklyDietModel>(`${environment.api}/weekly-diet/update/${id}`, weeklyDietRequest);
  }

  removeWeeklyDiet (id: string): Observable<WeeklyDietModel> {
    return this.http.delete<WeeklyDietModel>(`${environment.api}/weekly-diet/remove/${id}`);
  }  
  
}
