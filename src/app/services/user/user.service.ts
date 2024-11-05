import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model'; // Ajusta la ruta según tu estructura

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://localhost:3000/patients'; // Ajusta esta URL según tu backend

  constructor(private http: HttpClient) {}

  getUserProfile(patientId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${patientId}`);
  }
}
