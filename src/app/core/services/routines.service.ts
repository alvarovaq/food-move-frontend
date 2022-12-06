import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '@shared/constants';
import { Routine } from '../models/routine';
import { RoutineRequest } from '../models/routine-request';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getRoutines (): Observable<Routine[]> {
    return this.http.get<Routine[]>(`${API_ENDPOINT}/routines/findAll`);
  }

  getRoutine (id: string): Observable<Routine> {
    return this.http.get<Routine>(`${API_ENDPOINT}/routines/findOne/${id}`);
  }

  createRoutine (routine: RoutineRequest): Observable<Routine> {
    return this.http.post<Routine>(`${API_ENDPOINT}/routines/create`, routine);
  } 

  updateRoutine (id: string, routine: RoutineRequest): Observable<Routine> {
    return this.http.patch<Routine>(`${API_ENDPOINT}/routines/update/${id}`, routine);
  }

  removeRoutine (id: string): Observable<Routine> {
    return this.http.delete<Routine>(`${API_ENDPOINT}/routines/remove/${id}`);
  }  

}
