import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthRequestModel } from '@core/models/auth-request.model';
import { AuthService } from '@shared/services/auth.service';
import { EmployeesService } from '@shared/services/employees.service';
import { RouterService } from '@shared/services/router.service';
import { SnackerService } from '@shared/services/snacker.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly snacker: SnackerService,
    private readonly routerService: RouterService,
    private readonly employeesService: EmployeesService
  ) {}

  get email (): string {
    return this.form.value.email
  }

  get password (): string {
    return this.form.value.password;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login (): void {
    this.loading = true;
    const user: AuthRequestModel = this.getAuthRequest();
    this.authService.getNewToken(user)
    .pipe(finalize(() => (this.loading = false)))
    .subscribe(
      res => {
        this.loading = true;
        if (res.user.isEmployee) {
          this.authService.login(res);
        } else {
          this.snacker.showError('No tienes acceso');
        }
      },
      err => {
        console.log(err);
        this.snacker.showError(err.error.message);
      }
    );
  }

  private getAuthRequest (): AuthRequestModel {
    return {
      email: this.email,
      password: this.password
    };
  }

}
