import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientModel } from '@core/models/patient.model';
import { LoaderService } from '@shared/services/loader.service';
import { PatientsService } from '@shared/services/patients.service';
import { SnackerService } from '@shared/services/snacker.service';
import { finalize } from 'rxjs/operators';
import { RouterService } from '../../../../shared/services/router.service';

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
          this.routerService.goToPatients();
          this.snackerService.showError("No se ha encontrado al paciente");
        }
      );
    };
  }

}
