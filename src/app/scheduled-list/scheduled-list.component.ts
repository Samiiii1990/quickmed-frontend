import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../services/appointment/appointment.service';
import { AppointmentDto } from '../models/appointment/appointment.dto';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'; // Asegúrate de que el servicio de autenticación esté importado

@Component({
  selector: 'app-scheduled-list',
  templateUrl: './scheduled-list.component.html',
  styleUrls: ['./scheduled-list.component.css']
})
export class ScheduledListComponent implements OnInit {
  patientId!: string;
  displayedColumns: string[] = ['date', 'time', 'doctor', 'status'];
  dataSource = new MatTableDataSource<AppointmentDto>();
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private authService: AuthService // Asegúrate de tener el servicio de autenticación
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      this.loadPatientAppointments();
 // Verifica el estado de inicio de sesión
    });
  }

  loadPatientAppointments() {
    this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe(
      appointments => {
        this.dataSource.data = appointments;
      },
      error => {
        console.error('Error loading appointments:', error);
      }
    );
  }



  navigateToSchedule() {
    // Asegúrate de que este método se esté llamando
    console.log("Navigating to schedule...");
    this.router.navigate(['/appointments', this.patientId]); // Agrega patientId a la ruta
  }
}
