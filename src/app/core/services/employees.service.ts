import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/shared/constants';
import { Employee } from '../models/employee';
import { EmployeeRequest } from '../models/employee-request';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getEmployeeByEmail (email: string): Observable<Employee> {
    return this.http.post<Employee>(`${API_ENDPOINT}/employees/findFirst`, {email});
  }

  getEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_ENDPOINT}/employees/findAll`);
  }

  getEmployee (id: string): Observable<Employee> {
    return this.http.get<Employee>(`${API_ENDPOINT}/employees/findOne/${id}`);
  }

  createEmployee (employee: EmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(`${API_ENDPOINT}/employees/create`, employee);
  }

  updateEmployee (id: string, employee: EmployeeRequest): Observable<Employee> {
    return this.http.patch<Employee>(`${API_ENDPOINT}/employees/update/${id}`, employee);
  }

  removeEmployee (id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${API_ENDPOINT}/employees/remove/${id}`);
  }

}
