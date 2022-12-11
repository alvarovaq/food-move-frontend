import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientRequestModel } from '@core/models/patient-request.model';
import { LoaderService } from '@shared/services/loader.service';
import { RouterService } from '@shared/services/router.service';
import { SnackerService } from '@shared/services/snacker.service';
import { finalize, isEmpty } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ConsultModel } from '@core/models/consult.model';
import { PatientsService } from '@shared/services/patients.service';
import { ConsultsService } from '@shared/services/consults.service';
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

  created_at: Date = new Date();
  
  buttonClear = {
    masa: false,
    imc: false,
    per_abdominal: false,
    tension: false,
    trigliceridos: false,
    hdl: false,
    ldl: false,
    hemoglobina: false,
    glucosa: false,
    comments: false
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
      hdl: [null, [Validators.min(0)]],
      ldl: [null, [Validators.min(0)]],
      hemoglobina: [null, [Validators.min(0)]],
      glucosa: [null, [Validators.min(0)]],
      comments: [null],
    });
  }

  get masa (): number | null {
    return this.form.value.masa;
  }

  get imc (): number | null {
    return this.form.value.imc;
  }

  get per_abdominal (): number | null {
    return this.form.value.per_abdominal;
  }

  get tension (): number | null {
    return this.form.value.tension;
  }

  get trigliceridos (): number | null {
    return this.form.value.trigliceridos;
  }

  get hdl (): number | null {
    return this.form.value.hdl;
  }

  get ldl (): number | null {
    return this.form.value.ldl;
  }

  get hemoglobina (): number | null {
    return this.form.value.hemoglobina;
  }

  get glucosa (): number | null {
    return this.form.value.glucosa;
  }

  get comments (): string | null {
    return this.form.value.comments;
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
    const consult = this.getConsultRequest();
    this.loaderService.isLoading.next(true);
    this.consultsService.createConsult(consult)
    .pipe(finalize(() => this.loaderService.isLoading.next(false)))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Consulta creada con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  editConsult (): void {
  }

  getConsultRequest (): ConsultRequestModel {
    return this.optionalPipe.transform({
      patient: this.patient._id,
      masa: this.masa,
      imc: this.imc,
      per_abdominal: this.per_abdominal,
      tension: this.tension,
      trigliceridos: this.trigliceridos,
      hdl: this.hdl,
      ldl: this.ldl,
      hemoglobina: this.hemoglobina,
      glucosa: this.glucosa,
      comments: this.comments,
      created_at: this.created_at
    });
  }

}
