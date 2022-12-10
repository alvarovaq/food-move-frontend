import { Component, OnInit } from '@angular/core';
import { RouterService } from '../../../../core/services/router.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from '../../../../core/services/patients.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { PatientModel } from '../../../../core/models/patient.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.css']
})
export class PatientPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
