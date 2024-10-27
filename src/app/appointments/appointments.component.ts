import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {
  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder, private appointmentService: AppointmentService) {
    this.appointmentForm = this.fb.group({
      patientDNI: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  onSchedule() {
    if (this.appointmentForm.valid) {
      this.appointmentService.scheduleAppointment(this.appointmentForm.value).subscribe(
        response => {
          console.log('Appointment scheduled!', response);
          // Aquí puedes redirigir o mostrar un mensaje de éxito
        },
        error => {
          console.error('Error scheduling appointment', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
