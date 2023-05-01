import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../../shared/modules/mat/mat.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    SharedModule
  ]
})
export class AuthModule { }
