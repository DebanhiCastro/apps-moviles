import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Función para iniciar sesión
  login(username: string, password: string): boolean {
    // Comprobamos si las credenciales son correctas
    if (username === 'usuario' && password === '1234') {
      // Guardamos el token en el almacenamiento local
      localStorage.setItem('currentUser', JSON.stringify({ username, token: 'fake-token' }));
      return true; // Login exitoso
    } else {
      return false; // Credenciales incorrectas
    }
  }

  // Función para cerrar sesión
  logout(): void {
    // Eliminamos el token del almacenamiento local
    localStorage.removeItem('currentUser');
  }

  // Función para obtener el usuario actual
  getCurrentUser(): any {
    // Obtenemos el usuario del almacenamiento local
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  // Función para comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    // Comprobamos si existe el token en el almacenamiento local
    return !!localStorage.getItem('currentUser');
  }
}
