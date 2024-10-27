import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Verifica si localStorage está disponible
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  saveToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }

  getToken() {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  removeToken() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
