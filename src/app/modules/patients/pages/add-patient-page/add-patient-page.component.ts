import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientRequestModel } from '@core/models/patient-request.model';
import { LoaderService } from '@core/services/loader.service';
import { PatientsService } from '@core/services/patients.service';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { finalize } from 'rxjs/operators';
import { birthDateValidator } from '@modules/patients/validators/date.validator';
import { ActivatedRoute } from '@angular/router';
import { PatientModel } from '@core/models/patient.model';
import { DatePipe } from '@angular/common';
import { OptionalPipe } from '../../../../shared/pipes/optional.pipe';

@Component({
  selector: 'app-add-patient-page',
  templateUrl: './add-patient-page.component.html',
  styleUrls: ['./add-patient-page.component.css', '../../../../../assets/styles/form.css']
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

  imageFile?: string = "";
  selectedFile?: File;
  removeProfileImage: boolean = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly datePipe: DatePipe,
    private readonly fb: FormBuilder,
    private readonly patientsService: PatientsService,
    private readonly optionalPipe: OptionalPipe,
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
      name: [this.edit ? this.patient!.name : null, [Validators.required]],
      surname: [this.edit ? this.patient!.surname : null],
      email: [this.edit ? this.patient!.email : null, [Validators.required, Validators.email]],
      phone: [this.edit ? this.patient!.phone : null],
      birth: [this.edit ? this.patient!.birth ? this.datePipe.transform(this.patient!.birth, 'dd/MM/YYYY') : null : null, birthDateValidator()],
    });
  }

  get name (): string | null {
    return this.form.value.name;
  }

  get surname (): string | null {
    return this.form.value.surname;
  }

  get email (): string | null {
    return this.form.value.email;
  }

  get phone (): string | null {
    return this.form.value.phone;
  }

  get birth (): Date | null {
    const birth = this.form.value.birth;
    if (!birth) return null;
    const [day, month, year] = birth.split('/');
    const date = new Date(+year, +month - 1, +day);
    return date;
  }

  clearField (field: string): void {
    this.form.value[field] = null;
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
        if (this.selectedFile) {
          const fd = new FormData();
          fd.append('file', this.selectedFile!, this.selectedFile?.name);
          this.patientsService.uploadProfileImage(res._id, fd)
          .subscribe(
            res => {
              this.exit();
              this.snackerService.showSuccessful("Paciente creado con éxito");
            },
            err => {
              console.log(err);
              this.exit();
              this.snackerService.showError("Error al subir la foto de perfil");
            }
          );
        } else {
          this.exit();
          this.snackerService.showSuccessful("Paciente creado con éxito");
        }
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  editPatient (): void {
    this.loaderService.isLoading.next(true);
    const patient = this.getPatientRequest(true);
    this.patientsService.updatePatient(this.patient!._id, patient)
    .pipe(finalize(() => {
      this.loaderService.isLoading.next(false);
    }))
    .subscribe(
      res => {
        if (this.selectedFile) {
          const fd = new FormData();
          fd.append('file', this.selectedFile!, this.selectedFile?.name);
          this.patientsService.uploadProfileImage(res._id, fd)
          .subscribe(
            res => {
              this.exit();
              this.snackerService.showSuccessful("Paciente editado con éxito");
            },
            err => {
              console.log(err);
              this.exit()
              this.snackerService.showError("Error al subir la foto la foto de perfil")
            }
          )
        } else if (this.removeProfileImage) {
          this.patientsService.removeProfileImage(res._id)
          .subscribe(
            res => {
              this.exit();
              this.snackerService.showSuccessful("Paciente editado con éxito");
            },
            err => {
              console.log(err);
              this.exit()
              this.snackerService.showError("Error al eliminar la foto de perfil");
            }
          )
        } else {
          this.exit();
          this.snackerService.showSuccessful("Paciente editado con éxito");
        }
      },
      err => {
        console.log(err);
        this.snackerService.showError(err.error.message);
      }
    );
  }

  private getPatientRequest (edit:boolean = false): PatientRequestModel {
    const request = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: '123456789',
      phone: this.phone,
      birth: this.birth
    };
    return edit ? request : this.optionalPipe.transform(request);
  }

  onSelectFile (event: any): void {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageFile = reader.result as string;
    reader.readAsDataURL(this.selectedFile);
  }

  onRemoveProfileImage (): void {
    this.removeProfileImage = true;
    this.selectedFile = undefined;
    this.imageFile = "";
  }

  onRecoverProfileImage (): void {
    this.removeProfileImage = false;
    this.selectedFile = undefined;
    this.imageFile = "";
  }

}
