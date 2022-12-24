import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodModel } from '@core/models/food.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  constructor(
    private readonly http: HttpClient 
  ) {}

  getFoodsByPatientAndDate (patient: string, date: Date): Observable<FoodModel[]> {
    return this.http.post<FoodModel[]>(`${environment.api}/foods/find`, {patient, date});
  }

}
