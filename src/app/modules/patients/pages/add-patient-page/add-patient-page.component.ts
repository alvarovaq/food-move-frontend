import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientRequestModel } from '@core/models/patient-request.model';
import { LoaderService } from '@core/services/loader.service';
import { PatientsService } from '@core/services/patients.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { finalize } from 'rxjs/operators';
import { dateValidator } from '@core/validators/date.validator';
import { ActivatedRoute } from '@angular/router';
import { PatientModel } from '@core/models/patient.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-patient-page',
  templateUrl: './add-patient-page.component.html',
  styleUrls: ['./add-patient-page.component.css', '../../../../shared/styles/form.css']
})
export class AddPatientPageComponent implements OnInit {

  form!: FormGroup;
  edit: boolean = false;
  patient: PatientModel | null = null;
  
  buttonClear = {
    name: false,
    surname: false,
    email: false,
    phone: false,
    birth: false
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly datePipe: DatePipe,
    private readonly fb: FormBuilder,
    private readonly patientsService: PatientsService,
    private readonly routerService: RouterService,
    private readonly loaderService: LoaderService,
    private readonly snackerService: SnackerService
  ) {}

  ngOnInit(): void {
    this.loaderService.isLoading.next(true);
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.patientsService.getPatient(params['id'])
      .pipe(finalize(() => {
        this.loaderService.isLoading.next(false);
      }))
      .subscribe(
        res => {
          this.edit = true;
          this.patient = res;
          this.initForm();
        },
        err => {
          this.exit();
          this.snackerService.showError("Algo no ha sucedido como se esperaba");
        }
      );
    } else {
      this.initForm();
      this.loaderService.isLoading.next(false);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.edit ? this.patient!.name : '', [Validators.required]],
      surname: [this.edit ? this.patient!.surname : ''],
      email: [this.edit ? this.patient!.email : '', [Validators.required, Validators.email]],
      phone: [this.edit ? this.patient!.phone : ''],
      birth: [this.edit ? this.patient!.birth ? this.datePipe.transform(this.patient!.birth, 'dd/MM/YYYY') : '' : '', dateValidator()],
    });
  }

  get name (): string {
    return this.form.value.name;
  }

  get surname (): string {
    return this.form.value.surname;
  }

  get email (): string {
    return this.form.value.email;
  }

  get phone (): string {
    return this.form.value.phone;
  }

  get birth (): Date | null {
    const [day, month, year] = this.form.value.birth.split('/');
    const date = new Date(+year, +month - 1, +day);
    return date;
  }

  clearField (field: string): void {
    this.form.value[field] = '';
    this.form.reset(this.form.value);
  }

  exit(): void {
    this.routerService.goToPatients();
  }

  addPatient (): void {
    this.loaderService.isLoading.next(true);
    const patient = this.getPatientRequest();
    this.patientsService.createPatient(patient)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Paciente creado con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  editPatient (): void {
    this.loaderService.isLoading.next(true);
    const patient = this.getPatientRequest();
    this.patientsService.updatePatient(this.patient!._id, patient)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        this.exit();
        this.snackerService.showSuccessful("Paciente editado con éxito");
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  private getPatientRequest (): PatientRequestModel {
    return {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: '123456789',
      phone: this.phone,
      birth: this.birth
    };
  }

}