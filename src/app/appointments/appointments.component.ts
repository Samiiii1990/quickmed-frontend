import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment/appointment.service';
import { DoctorService } from '../services/doctor/doctor.service';
import { PatientService } from '../services/patient/patient.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private router: Router,
    private patientService: PatientService // Inyectamos el servicio de pacientes
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
    this.loadDoctors(); // Cargar la lista de médicos al inicializar el componente
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
                status: 'Agendado',
                patientId,
              };
  
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
