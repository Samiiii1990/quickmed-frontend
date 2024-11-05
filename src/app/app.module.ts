import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScheduledListComponent } from './components/scheduled-list/scheduled-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AppointmentsComponent,
    DoctorsComponent,
    SuccessDialogComponent,
    ScheduledListComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
