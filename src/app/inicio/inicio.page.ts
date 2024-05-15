import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  constructor(
    private router: Router,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    const containerElement = document.querySelector('.container');
    if (containerElement) {
      // Animación de entrada
      const animation = this.animationCtrl.create()
        .addElement(containerElement)
        .duration(1000)
        .iterations(1)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'translateY(-20px)' },
          { offset: 1, opacity: '1', transform: 'translateY(0)' }
        ]);

      animation.play();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
