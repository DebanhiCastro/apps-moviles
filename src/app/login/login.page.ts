import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  username: string = '';
  password: string = '';

  login() {
    if (this.username === 'usuario' && this.password === 'contraseña') {
      alert('¡Inicio de sesión exitoso!');
    } else {
      alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  }

}
