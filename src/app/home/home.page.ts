import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  allProducts: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductServiceService
  ) {}

  ngOnInit() {
    // Llama al método para obtener todos los productos
    this.getAllProducts();
  }

  viewProductDetails(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }

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

  logout() {
    // Aquí deberías agregar la lógica de logout si es necesario
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
