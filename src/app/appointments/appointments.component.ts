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
      // Obtener el DNI del paciente
      const patientDNI = this.appointmentForm.value.patientDNI;
  
      // Primero, obtenemos el patientId a partir del DNI
      this.patientService.getPatientByDni(patientDNI).subscribe({
        next: (patients) => {
          // Los pacientes están indexados por su ID, por lo que necesitarás recorrer el objeto
          const patientKeys = Object.keys(patients); // Obtener las claves del objeto
          if (patientKeys.length > 0) {
            const patient = patients[patientKeys[0]]; // Obtener el primer paciente
  
            const patientId = patient.id; // Acceder al id del paciente
  
            // Programar la cita con el patientId obtenido
            const appointmentData = {
              ...this.appointmentForm.value,
              patientId, // Agregar el patientId a los datos de la cita
            };
  
            this.appointmentService.scheduleAppointment(patientId, appointmentData).subscribe(
              response => {
                console.log('Appointment scheduled!', response);
                this.router.navigate(['/scheduled-list', { id: patientId }]);
              },
              error => {
                console.error('Error scheduling appointment', error);
              }
            );
          } else {
            console.error('Patient not found');
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
