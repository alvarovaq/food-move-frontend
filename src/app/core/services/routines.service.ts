import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutineModel } from '../models/routine.model';
import { RoutineRequestModel } from '../models/routine-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getRoutines (): Observable<RoutineModel[]> {
    return this.http.get<RoutineModel[]>(`${environment.api}/routines/findAll`);
  }

  getRoutine (id: string): Observable<RoutineModel> {
    return this.http.get<RoutineModel>(`${environment.api}/routines/findOne/${id}`);
  }

  createRoutine (routine: RoutineRequestModel): Observable<RoutineModel> {
    return this.http.post<RoutineModel>(`${environment.api}/routines/create`, routine);
  } 

  updateRoutine (id: string, routine: RoutineRequestModel): Observable<RoutineModel> {
    return this.http.patch<RoutineModel>(`${environment.api}/routines/update/${id}`, routine);
  }

  removeRoutine (id: string): Observable<RoutineModel> {
    return this.http.delete<RoutineModel>(`${environment.api}/routines/remove/${id}`);
  }  

}
