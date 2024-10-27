import { Injectable } from '@angular/core';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';  
import { catchError } from 'rxjs/operators';  
import { StorageService } from './storage.service';

@Injectable({  
  providedIn: 'root',  
})  
export class AuthService {  
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private storageService: StorageService) {}  

  register(user: any): Observable<any> {  
    return this.http.post(`${this.apiUrl}/register`, user).pipe(  
      catchError(this.handleError)  
    );  
  }  

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      withCredentials: true, // Solo si necesitas enviar cookies
    });
  }
  saveToken(token: string) {
    this.storageService.saveToken(token); // Usa el servicio de almacenamiento
  }

  getToken() {
    return this.storageService.getToken();
  }

  logout() {
    this.storageService.removeToken();
  }

  isAuthenticated(): boolean {
    return this.storageService.isAuthenticated();
  }
  private handleError(error: HttpErrorResponse) {  
    let errorMessage = 'An unknown error occurred!';  
    if (error.error instanceof ErrorEvent) {  
      errorMessage = `Error: ${error.error.message}`;  
    } else {  
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;  
    }  
    return throwError(errorMessage);  
  }  
}