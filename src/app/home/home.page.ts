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
  products: Product[] = [];
  constructor(private router: Router,private productService: ProductServiceService) {}
  ngOnInit() {
    // Llama al método para obtener todos los productos
    this.getProductsFromFirebase();
  }
  viewProductDetails(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }
    // Método para obtener los productos de Firebase y mostrarlos en consola
    async getProductsFromFirebase() {
      try {
        // Llama al servicio para obtener los productos
        const products = await this.productService.getProducts();
  
        // Muestra los productos en consola
        console.log('Productos obtenidos de Firebase:', products);
  
        // Asigna los productos obtenidos a la variable local para mostrarlos en la vista
        this.products = products;
      } catch (error) {
        console.error('Error al obtener productos de Firebase:', error);
      }
    }
  
}
