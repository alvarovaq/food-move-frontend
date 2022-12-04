import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../models/patient';

@Pipe({
  name: 'patient'
})
export class PatientPipe implements PipeTransform {

  transform(patient: Patient): Patient {
    let newPatient: Patient = Object.assign({}, patient);
    newPatient.birth = patient.birth ? new Date(patient.birth) : null;
    return newPatient; 
  }

}
