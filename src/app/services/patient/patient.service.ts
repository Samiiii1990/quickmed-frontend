// patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = `${environment.apiUrl}/patients`; 

  constructor(private http: HttpClient) {}

  addPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, patientData);
  }

  getPatientByDni(dni: string): Observable<any> {
    console.log("🚀 ~ PatientService ~ getPatientByDni ~ dni:", dni)
    return this.http.get<any>(`${this.apiUrl}?dni=${dni}`);
  }
  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
