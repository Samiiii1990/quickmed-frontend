import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model'; // Ajusta la ruta según tu estructura
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = `${environment.apiUrl}/patients`; 

  constructor(private http: HttpClient) {}

  getUserProfile(patientId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${patientId}`);
  }
}
