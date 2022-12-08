import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
import { EmployeeRequestModel } from '../models/employee-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getEmployeeByEmail (email: string): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(`${environment.api}/employees/findFirst`, {email});
  }

  getEmployees (): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${environment.api}/employees/findAll`);
  }

  getEmployee (id: string): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${environment.api}/employees/findOne/${id}`);
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

}
