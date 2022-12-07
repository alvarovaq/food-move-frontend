import { Pipe, PipeTransform } from '@angular/core';
import { PatientModel } from '../models/patient.model';

@Pipe({
  name: 'patient'
})
export class PatientPipe implements PipeTransform {

  transform(patient: PatientModel): PatientModel {
    let newPatient: PatientModel = Object.assign({}, patient);
    newPatient.birth = patient.birth ? new Date(patient.birth) : null;
    return newPatient; 
  }

}
