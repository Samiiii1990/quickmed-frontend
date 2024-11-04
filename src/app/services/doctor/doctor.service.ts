import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = `http://localhost:3000/doctors`;
  
  constructor(private http: HttpClient) {}

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addDoctor(doctor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, doctor);
  }
  getDoctorById(doctorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${doctorId}`);
  }
  
}