import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientModel } from '@core/models/patient.model';
import { LoaderService } from '@core/services/loader.service';
import { PatientsService } from '@core/services/patients.service';
import { SnackerService } from '@core/services/snacker.service';
import { finalize } from 'rxjs/operators';
import { RouterService } from '../../../../core/services/router.service';
import { ViewPatientService } from '../../../../core/services/view-patient.service';

@Component({
  selector: 'app-moves-page',
  templateUrl: './moves-page.component.html',
  styleUrls: ['./moves-page.component.css']
})
export class MovesPageComponent implements OnInit {

  patient: PatientModel | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly patientsService: PatientsService,
    private readonly routerService: RouterService,
    private readonly snackerService: SnackerService,
    private readonly loaderService: LoaderService,
    private readonly viewPatientService: ViewPatientService
  ) { }

  ngOnInit(): void {
    this.viewPatientService.patient$
    .subscribe(
      res => {
        this.patient = res;
      },
      err => {
        console.log(err);
        this.routerService.goToPatients();
        this.snackerService.showError("No se ha encontrado al paciente");
      }
    );
  }

}
