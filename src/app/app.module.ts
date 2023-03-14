import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { PatientPipe } from './shared/pipes/patient.pipe';
import { FoodPipe } from './shared/pipes/food.pipe';
import { MovePipe } from '@shared/pipes/move.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PatientPipe,
    FoodPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    PatientPipe,
    FoodPipe,
    MovePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
