import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PatientModel } from '../../core/models/patient.model';
import { PatientRequestModel } from '../../core/models/patient-request.model';
import { PatientPipe } from '../pipes/patient.pipe';
import { environment } from 'src/environments/environment';
import { CustomQuery } from '@core/interfaces/custom-query';
import { FilterResponse } from '../../core/interfaces/filter-response';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private readonly http: HttpClient,
    private readonly patientPipe: PatientPipe
  ) {}

  getPatientsPagination (customQuery: CustomQuery): Observable<FilterResponse> {
    return this.http.post<FilterResponse>(`${environment.api}/patients/filter`, customQuery).pipe(
      map((data) => {
        let newData: FilterResponse = Object.assign({}, data);
        newData.items.map((patient: PatientModel) => {
          return this.patientPipe.transform(patient);
        });
        return newData;
      })
    );
  }

  getPatient (id: string): Observable<PatientModel> {
    return this.http.get<PatientModel>(`${environment.api}/patients/${id}`).pipe(
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
