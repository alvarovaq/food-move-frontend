import { Pipe, PipeTransform } from '@angular/core';
import { PatientModel } from '../models/patient.model';

@Pipe({
  name: 'patient'
})
export class PatientPipe implements PipeTransform {

  transform(patient: PatientModel): PatientModel {
    try {
      let newPatient: PatientModel = Object.assign({}, patient);
      if (patient.birth != undefined) newPatient.birth = new Date(patient.birth)
      return newPatient; 
    } catch (e) {
      console.log(e);
      return patient;
    }
  }

}
