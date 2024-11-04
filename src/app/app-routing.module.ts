import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ScheduledListComponent } from './scheduled-list/scheduled-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'register', component: RegisterComponent }, 
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard]  },
  { path: 'appointments/:id', component: AppointmentsComponent, canActivate: [AuthGuard]  },
  { path: 'scheduled-list', component: ScheduledListComponent, canActivate: [AuthGuard]  },
  { path: 'scheduled-list/:id', component: ScheduledListComponent, canActivate: [AuthGuard]  } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
