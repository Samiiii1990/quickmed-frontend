import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { PatientService } from '../../services/patient/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors: any[] = [];
  availableTimes: string[] = [];
  appointmentId: string | null = null;
  appointmentData: Appointment | null = null;
  isEditing: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private router: Router,
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {
    this.appointmentForm = this.fb.group({
      patientDNI: ['', Validators.required],
      doctorId: ['', Validators.required], // Agregamos el campo para el médico
      date: ['', Validators.required],
      time: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadDoctors();
    this.generateAvailableTimes(); // Asegúrate de llamar a este método aquí
    this.route.paramMap.subscribe(params => {
      this.appointmentId = params.get('appointmentId');
      if (this.appointmentId) {
        this.loadAppointmentData(this.appointmentId);
        this.isEditing = true;
      }
    });
  }

  loadAppointmentData(appointmentId: string) {
    this.appointmentService.getAppointmentById(appointmentId).subscribe({
      next: (data) => {
        this.appointmentData = data;

        // Precargar los datos en el formulario
        this.appointmentForm.patchValue({
          patientDNI: this.appointmentData.patientDNI,
          doctorId: this.appointmentData.doctorId,
          date: this.appointmentData.date,
          time: this.appointmentData.time,
          notes: this.appointmentData.notes,
        });
      },
      error: (error) => console.error('Error loading appointment data:', error)
    });
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data; // Guardar la lista de médicos
      },
      error: (err) => {
        console.error('Error loading doctors', err);
      }
    });
  }

  generateAvailableTimes() {
    const startHour = 8;
    const endHour = 20;
    const interval = 30; // Intervalo de 30 minutos

    this.availableTimes = []; // Reinicia la lista de horas disponibles

    for (let hour = startHour; hour < endHour; hour++) {
      this.availableTimes.push(`${this.formatTime(hour)}:00`);
      this.availableTimes.push(`${this.formatTime(hour)}:30`);
    }
    this.availableTimes.push(`${this.formatTime(endHour)}:00`); // Añadir la última hora completa
  }

  formatTime(hour: number): string {
    return hour < 10 ? `0${hour}` : `${hour}`;
  }

  onSchedule() {
    if (this.appointmentForm.valid) {
        const patientDNI = this.appointmentForm.value.patientDNI;

        this.patientService.getAllPatients().subscribe({
            next: (patients) => {
                if (Array.isArray(patients)) {
                    const patient = patients.find(p => p.dni === patientDNI);
                    console.log("🚀 ~ AppointmentsComponent ~ patient:", patient);

                    if (patient) {
                        const patientId = patient.id;
                        const appointmentData = {
                            ...this.appointmentForm.value,
                            status: this.isEditing ? 'Actualizado' : 'Agendado', // Cambia el estado dependiendo del modo
                            patientId,
                        };

                        // Si estás editando, actualiza la cita en lugar de crear una nueva
                        if (this.isEditing && this.appointmentId) {
                            this.appointmentService.updateAppointment(this.appointmentId, appointmentData).subscribe(
                                response => {
                                    console.log('Appointment updated!', response);
                                    this.router.navigate(['/scheduled-list', { id: patientId }]);
                                    this.appointmentForm.reset();
                                },
                                error => {
                                    console.error('Error updating appointment', error);
                                }
                            );
                        } else {
                            // Lógica para agendar una nueva cita
                            this.appointmentService.scheduleAppointment(patientId, appointmentData).subscribe(
                                response => {
                                    console.log('Appointment scheduled!', response);
                                    this.router.navigate(['/scheduled-list', { id: patientId }]);
                                    this.appointmentForm.reset();
                                },
                                error => {
                                    console.error('Error scheduling appointment', error);
                                }
                            );
                        }
                    } else {
                        console.error('Patient not found');
                    }
                } else {
                    console.error('Expected an array of patients, but got:', patients);
                }
            },
            error: (err) => {
                console.error('Error fetching patient data', err);
            }
        });
    } else {
        console.error('Form is not valid');
    }
}
}
