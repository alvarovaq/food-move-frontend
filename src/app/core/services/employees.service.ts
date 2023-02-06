import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
import { EmployeeRequestModel } from '../models/employee-request.model';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../interfaces/custom-response';
import { CustomQuery } from '@core/interfaces/custom-query';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getEmployee (id: string): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${environment.api}/employees/${id}`);
  }

  getEmployeeByEmail (email: string): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(`${environment.api}/employees/lookUp`, {email});
  }

  filter (customQuery: CustomQuery): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${environment.api}/employees/filter`, customQuery);
  }

  createEmployee (employee: EmployeeRequestModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(`${environment.api}/employees/create`, employee);
  }

  updateEmployee (id: string, employee: EmployeeRequestModel): Observable<EmployeeModel> {
    return this.http.patch<EmployeeModel>(`${environment.api}/employees/update/${id}`, employee);
  }

  removeEmployee (id: string): Observable<EmployeeModel> {
    return this.http.delete<EmployeeModel>(`${environment.api}/employees/remove/${id}`);
  }

  uploadProfileImage (id: string, formData: FormData): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(`${environment.api}/employees/upload/${id}`, formData);
  }

  removeProfileImage (id: string): Observable<EmployeeModel> {
    return this.http.delete<EmployeeModel>(`${environment.api}/employees/remove-profile-image/${id}`);
  }

}
