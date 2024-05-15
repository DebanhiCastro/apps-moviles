import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private userIdKey: string = 'userId'; // Clave para el Local Storage

  constructor() {
    // Al inicializar el servicio, verificamos si el usuario está autenticado
    // obteniendo su estado del Local Storage
    this.isAuthenticated = this.checkAuthState();
  }

  login(username: string, password: string): boolean {
    // Aquí puedes implementar la lógica de autenticación con tu backend o servicio
    if (username === 'us1' && password === 'con1') {
      this.isAuthenticated = true;
      this.saveUserId('1'); // Guardamos el ID de usuario
      return true;
    } else if (username === 'usuario2' && password === 'contraseña2') {
      this.isAuthenticated = true;
      this.saveUserId('2'); // Guardamos el ID de usuario
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.removeUserId(); // Eliminamos el ID de usuario al cerrar sesión
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey); // Obtenemos el ID de usuario del Local Storage
  }

  private saveUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId); // Guardamos el ID de usuario en el Local Storage
  }

  private removeUserId(): void {
    localStorage.removeItem(this.userIdKey); // Eliminamos el ID de usuario del Local Storage
  }

  private checkAuthState(): boolean {
    // Comprobamos si el usuario está autenticado obteniendo su estado del Local Storage
    const userId = localStorage.getItem(this.userIdKey);
    return !!userId; // Si userId existe, el usuario está autenticado; de lo contrario, no lo está
  }
}
