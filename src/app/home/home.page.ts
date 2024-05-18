import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { AuthService } from '../services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  allProducts: Product[] = []; // Array para almacenar todos los productos

  constructor(
    private router: Router, // Inyecta el Router para la navegación
    private productService: ProductServiceService, // Inyecta el servicio de productos
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {}

  ngOnInit() {
    // Llama al método para obtener todos los productos al inicializar el componente
    this.getAllProducts();
  }

  // Navega a la página de detalles del producto con el ID del producto
  viewProductDetails(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }

  // Método asincrónico para obtener todos los productos
  async getAllProducts() {
    try {
      // Llama al servicio para obtener todos los productos
      const products = await this.productService.getAllProducts();

      // Asigna los productos obtenidos a la variable local para mostrarlos en la vista
      this.allProducts = products;
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  }

  // Método para cerrar sesión
  logout() {
    // Llama al método de logout en el servicio de autenticación
    this.authService.logout();
    // Redirige al usuario a la página de login después del logout
    this.router.navigate(['/login']);
  }

  // Método para navegar a una ruta específica
  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
