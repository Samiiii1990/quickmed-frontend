// patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) {}

  addPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, patientData);
  }

  getPatientByDni(dni: string): Observable<any> {
    console.log("🚀 ~ PatientService ~ getPatientByDni ~ dni:", dni)
    return this.http.get<any>(`${this.apiUrl}?dni=${dni}`);
  }

}
