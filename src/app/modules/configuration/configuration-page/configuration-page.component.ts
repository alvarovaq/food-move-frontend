import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from '@core/models/employee.model';
import { AuthService } from '@core/services/auth.service';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.css', '../../../../assets/styles/form.css']
})
export class ConfigurationPageComponent implements OnInit {

  form!: FormGroup;
  employee: EmployeeModel | null = null;
  
  buttonClear = {
    name: false,
    surname: false,
    email: false,
    phone: false
  }

  imageFile?: string = "";
  selectedFile?: File;
  removeProfileImage: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.authService.user$
    .subscribe(
      res => {
        this.employee = res;
        this.initForm();
      },
      err => {
        console.log(err);
      }
    );
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.employee!.name, [Validators.required]],
      surname: [this.employee!.surname],
      email: [this.employee!.email, [Validators.required, Validators.email]],
      phone: [this.employee!.phone],
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

  clearField (field: string): void {
    this.form.value[field] = null;
    this.form.reset(this.form.value);
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
