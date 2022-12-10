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

  patient: PatientModel | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly routerService: RouterService,
    private readonly patientsService: PatientsService,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.isLoading.next(true);
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.patientsService.getPatient(params["id"])
      .pipe(finalize(() => this.loaderService.isLoading.next(false)))
      .subscribe(
        res => {
          this.patient = res;
        },
        err => {
          console.log(err);
        }
      );
    };
  }

  exit (): void {
    this.routerService.goToPatients();
  }

}
