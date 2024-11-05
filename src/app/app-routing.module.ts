import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ScheduledListComponent } from './components/scheduled-list/scheduled-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'register', component: RegisterComponent }, 
  { path: 'profile', component: UserProfileComponent , canActivate: [AuthGuard] },
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
