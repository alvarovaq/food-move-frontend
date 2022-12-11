import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientRequestModel } from '@core/models/patient-request.model';
import { LoaderService } from '@core/services/loader.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { finalize, isEmpty } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ConsultModel } from '@core/models/consult.model';
import { PatientsService } from '@core/services/patients.service';
import { ConsultsService } from '@core/services/consults.service';
import { PatientModel } from '@core/models/patient.model';
import { ConsultRequestModel } from '../../../../core/models/consult-request.model';
import { OptionalPipe } from '../../../../shared/pipes/optional.pipe';

@Component({
  selector: 'app-add-consult-page',
  templateUrl: './add-consult-page.component.html',
  styleUrls: ['./add-consult-page.component.css', '../../../../global/styles/form.css']
})
export class AddConsultPageComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  patient!: PatientModel;
  
  buttonClear = {
    masa: false,
    imc: false,
    per_abdominal: false,
    tension: false,
    trigliceridos: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly patientsService: PatientsService,
    private readonly consultsService: ConsultsService,
    private readonly optionalPipe: OptionalPipe,
    private readonly routerService: RouterService,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.loaderService.isLoading.next(true);
      this.patientsService.getPatient(params["id"])
      .pipe(finalize(() => this.loaderService.isLoading.next(false)))
      .subscribe(
        res => {
          this.patient = res;
          this.initForm();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      masa: [null, [Validators.min(0)]],
      imc: [null, [Validators.min(0)]],
      per_abdominal: [null, [Validators.min(0)]],
      tension: [null, [Validators.min(0)]],
      trigliceridos: [null, [Validators.min(0)]],
    });
  }

  get masa (): any {
    return this.form.value.masa;
  }

  clearField (field: string): void {
    this.form.value[field] = null;
    this.form.reset(this.form.value);
  }

  exit(): void {
    this.routerService.goToConsults(this.patient._id);
  }

  addConsult (): void {
    console.log(this.getConsultRequest());
  }

  editConsult (): void {
  }

  getConsultRequest (): ConsultRequestModel {
    return this.optionalPipe.transform({
      patient: this.patient._id,
      masa: this.masa,
      comments: "",
      created_at: new Date(2000, 1, 1)
    });
  }

}
