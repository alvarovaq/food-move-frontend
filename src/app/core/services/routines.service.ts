import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '@shared/constants';
import { RoutineModel } from '../models/routine.model';
import { RoutineRequestModel } from '../models/routine-request.model';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getRoutines (): Observable<RoutineModel[]> {
    return this.http.get<RoutineModel[]>(`${API_ENDPOINT}/routines/findAll`);
  }

  getRoutine (id: string): Observable<RoutineModel> {
    return this.http.get<RoutineModel>(`${API_ENDPOINT}/routines/findOne/${id}`);
  }

  createRoutine (routine: RoutineRequestModel): Observable<RoutineModel> {
    return this.http.post<RoutineModel>(`${API_ENDPOINT}/routines/create`, routine);
  } 

  updateRoutine (id: string, routine: RoutineRequestModel): Observable<RoutineModel> {
    return this.http.patch<RoutineModel>(`${API_ENDPOINT}/routines/update/${id}`, routine);
  }

  removeRoutine (id: string): Observable<RoutineModel> {
    return this.http.delete<RoutineModel>(`${API_ENDPOINT}/routines/remove/${id}`);
  }  

}
