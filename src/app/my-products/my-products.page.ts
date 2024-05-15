import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductServiceService } from '../services/product-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {
  products: Product[] = [];
  newProduct: Product = {
    id: '', // No es necesario establecer el ID aquí, lo genera el servicio
    idUsuario: '', // Este valor lo obtendremos del servicio AuthService
    name: '',
    description: '',
    price: 0,
    image: ''
  };
  showForm: boolean = false; // Variable para mostrar u ocultar el formulario

  constructor(
    private productService: ProductServiceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Obtenemos el ID del usuario autenticado
    this.newProduct.idUsuario = this.authService.getUserId() || '';
    this.getProductsFromFirebase();
  }

  async getProductsFromFirebase() {
    try {
      const products = await this.productService.getProductsByUserId(this.newProduct.idUsuario);
      this.products = products;
    } catch (error) {
      console.error('Error al obtener productos de Firebase:', error);
    }
  }

  async addProduct() {
    try {
      // Agregamos el nuevo producto
      await this.productService.addProduct(this.newProduct);
      // Actualizamos la lista de productos
      this.getProductsFromFirebase();
      // Limpiamos el formulario
      this.newProduct = {
        id: '', // Se generará automáticamente al agregar el producto
        idUsuario: this.authService.getUserId() || '',
        name: '',
        description: '',
        price: 0,
        image: ''
      };
      // Ocultamos el formulario después de agregar el producto
      this.showForm = false;
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  }

  // Método para mostrar u ocultar el formulario
  toggleForm() {
    this.showForm = !this.showForm;
  }
}
