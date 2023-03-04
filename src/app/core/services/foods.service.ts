import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FoodModel } from '@core/models/food.model';
import { environment } from 'src/environments/environment';
import { FoodRequestModel } from '../models/food-request.model';
import { DateRange } from '../interfaces/date-range';
import { FoodPipe } from '../../shared/pipes/food.pipe';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  constructor(
    private readonly http: HttpClient,
    private readonly foodPipe: FoodPipe
  ) {}

  getFoods (patient: string, dateRange: DateRange): Observable<FoodModel[]> {
    return this.http.post<FoodModel[]>(`${environment.api}/foods/findByPatient/${patient}`, dateRange).pipe(
      map((data) => {
        return data.map((food: FoodModel) => {
          return this.foodPipe.transform(food);
        });
      })
    );
  }

  createFood (foodRequest: FoodRequestModel): Observable<FoodModel> {
    return this.http.post<FoodModel>(`${environment.api}/foods/create`, foodRequest).pipe(
      map((food) => {
        return this.foodPipe.transform(food);
      })
    );
  }

  removeFood (id: string): Observable<FoodModel> {
    return this.http.delete<FoodModel>(`${environment.api}/foods/remove/${id}`).pipe(
      map((food) => {
        return this.foodPipe.transform(food);
      })
    );
  }
}
