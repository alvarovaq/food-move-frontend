import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '@shared/constants';
import { EmployeeModel } from '../models/employee.model';
import { EmployeeRequestModel } from '../models/employee-request.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getEmployeeByEmail (email: string): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(`${API_ENDPOINT}/employees/findFirst`, {email});
  }

  getEmployees (): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(`${API_ENDPOINT}/employees/findAll`);
  }

  getEmployee (id: string): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${API_ENDPOINT}/employees/findOne/${id}`);
  }

  createEmployee (employee: EmployeeRequestModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(`${API_ENDPOINT}/employees/create`, employee);
  }

  updateEmployee (id: string, employee: EmployeeRequestModel): Observable<EmployeeModel> {
    return this.http.patch<EmployeeModel>(`${API_ENDPOINT}/employees/update/${id}`, employee);
  }

  removeEmployee (id: string): Observable<EmployeeModel> {
    return this.http.delete<EmployeeModel>(`${API_ENDPOINT}/employees/remove/${id}`);
  }

}
