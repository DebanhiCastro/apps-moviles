import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() {
    this.isAuthenticated = !!localStorage.getItem('isAuthenticated');
  }

  login(username: string, password: string): boolean {
    if (username === 'usuario' && password === 'contraseña') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    } else {
      this.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }
}
