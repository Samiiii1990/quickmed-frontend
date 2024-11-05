import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/appointments'; // Ajusta esta URL según tu backend

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de médicos
  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/doctors`); // Asegúrate de que este endpoint exista
  }

  scheduleAppointment(patientId: string, appointmentData: Appointment): Observable<any> {
    // Prepara el objeto para enviar al backend
    const dataToSend = {
      patientId,
      ...appointmentData,
    };
    return this.http.post(this.apiUrl, dataToSend);
  }
  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${appointmentId}`);
  }
  getAppointmentsByPatientId(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/patients/${patientId}`);
  }

  getAppointmentsByDni(dni: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?dni=${dni}`);
  }

  updateAppointment(appointmentId: string, appointmentData: Appointment): Observable<any> {
    return this.http.put(`${this.apiUrl}/${appointmentId}`, appointmentData);
  }

  deleteAppointment(appointmentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${appointmentId}`);
  }
  
}
