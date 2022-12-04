import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/shared/constants';
import { Patient } from '../models/patient';
import { PatientRequest } from '../models/patient-request';
import { PatientPipe } from '../pipes/patient.pipe';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private readonly http: HttpClient,
    private readonly patientPipe: PatientPipe    
  ) {}

  getPatients (): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${API_ENDPOINT}/patients/findAll`).pipe(
      map((data) => {
        return data.map((patient) => {
          return this.patientPipe.transform(patient);
        })
      })
    );
  }

  getPatient (id: string): Observable<Patient> {
    return this.http.get<Patient>(`${API_ENDPOINT}/patients/findOne/${id}`).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  createPatient (patient: PatientRequest): Observable<Patient> {
    return this.http.post<Patient>(`${API_ENDPOINT}/patients/create`, patient).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  updatePatient (id: string, patient: PatientRequest): Observable<Patient> {
    return this.http.patch<Patient>(`${API_ENDPOINT}/patients/update/${id}`, patient).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  removePatient (id: string): Observable<Patient> {
    return this.http.delete<Patient>(`${API_ENDPOINT}/patients/remove/${id}`).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }  

}
