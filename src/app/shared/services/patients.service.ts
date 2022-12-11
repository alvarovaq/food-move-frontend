import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PatientModel } from '../../core/models/patient.model';
import { PatientRequestModel } from '../../core/models/patient-request.model';
import { PatientPipe } from '../pipes/patient.pipe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private readonly http: HttpClient,
    private readonly patientPipe: PatientPipe    
  ) {}

  getPatients (): Observable<PatientModel[]> {
    return this.http.get<PatientModel[]>(`${environment.api}/patients/findAll`).pipe(
      map((data) => {
        return data.map((patient) => {
          return this.patientPipe.transform(patient);
        })
      })
    );
  }

  getPatient (id: string): Observable<PatientModel> {
    return this.http.get<PatientModel>(`${environment.api}/patients/findOne/${id}`).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  createPatient (patient: PatientRequestModel): Observable<PatientModel> {
    return this.http.post<PatientModel>(`${environment.api}/patients/create`, patient).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  updatePatient (id: string, patient: PatientRequestModel): Observable<PatientModel> {
    return this.http.patch<PatientModel>(`${environment.api}/patients/update/${id}`, patient).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }

  removePatient (id: string): Observable<PatientModel> {
    return this.http.delete<PatientModel>(`${environment.api}/patients/remove/${id}`).pipe(
      map((patient) => {
        return this.patientPipe.transform(patient);
      })
    );
  }  

}
