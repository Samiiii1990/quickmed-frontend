import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentDto } from '../../models/appointment/appointment.dto';

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

  scheduleAppointment(patientId: string, appointmentData: AppointmentDto): Observable<any> {
    // Prepara el objeto para enviar al backend
    const dataToSend = {
      patientId,
      ...appointmentData,
    };
    
    return this.http.post(this.apiUrl, dataToSend);
  }

  getAppointmentsByPatientId(patientId: string): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(`${this.apiUrl}/patients/${patientId}`);
  }

  getAppointmentsByDni(dni: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?dni=${dni}`);
  }
}
