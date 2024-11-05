import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-scheduled-list',
  templateUrl: './scheduled-list.component.html',
  styleUrls: ['./scheduled-list.component.css']
})
export class ScheduledListComponent implements OnInit {
  patientId!: string;
  displayedColumns: string[] = ['date', 'time', 'doctor', 'specialization', 'status'];
  dataSource = new MatTableDataSource<Appointment>();
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private doctorService: DoctorService // Inyecta el servicio del doctor
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      this.loadPatientAppointments();
    });
  }

  loadPatientAppointments() {
    this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe(
      appointments => {
        this.dataSource.data = appointments;
        appointments.forEach(appointment => {
          if (appointment.doctorId) {
            this.doctorService.getDoctorById(appointment.doctorId).subscribe(
              doctor => {
                appointment.doctorName = doctor.name;
                appointment.doctorSpecialization = doctor.specialization;
              },
              error => console.error(`Error loading doctor data for ID ${appointment.doctorId}:`, error)
            );
          }
        });
      },
      error => console.error('Error loading appointments:', error)
    );
  }

  loadDoctors(doctorIds: string[], appointments: Appointment[]) {
    const doctorRequests = doctorIds.map(doctorId => 
      this.doctorService.getDoctorById(doctorId).toPromise()
    );

    Promise.all(doctorRequests)
      .then(doctors => {
        const doctorMap = doctors.reduce((map, doctor) => {
          map[doctor.id] = doctor;
          return map;
        }, {});
        const appointmentsWithDoctors = appointments.map(appointment => {
          const doctor = doctorMap[appointment.doctorId];
          return {
            ...appointment,
            doctorName: doctor ? doctor.name : 'Desconocido',
            doctorSpecialization: doctor ? doctor.specialization : 'Desconocido'
          };
        });

        this.dataSource.data = appointmentsWithDoctors;
      })
      .catch(error => {
        console.error('Error loading doctors:', error);
      });
  }

  editAppointment(appointmentId: string, appointment: Appointment) {
    this.router.navigate(['/appointments', this.patientId, { appointmentId, ...appointment }]);
  }

  deleteAppointment(appointmentId: string) {
    if (confirm("¿Estás seguro de que deseas eliminar este turno?")) {
      this.appointmentService.deleteAppointment(appointmentId).subscribe(
        response => {
          console.log('Turno eliminado!', response);
          this.loadPatientAppointments();
        },
        error => {
          console.error('Error eliminando el turno', error);
          alert('Hubo un error al eliminar el turno.');
        }
      );
    }
  }
  navigateToSchedule() {
    this.router.navigate(['/appointments', this.patientId]);
  }
}
