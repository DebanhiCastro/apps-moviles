import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductServiceService } from '../services/product-service.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.page.html',
  styleUrls: ['./my-products.page.scss'],
})
export class MyProductsPage implements OnInit {
  // Lista de productos del usuario
  products: Product[] = [];
  // Nuevo producto que se añadirá, inicializado con valores por defecto
  newProduct: Product = {
    id: '', // No es necesario establecer el ID aquí, lo genera el servicio
    idUsuario: '', // Este valor lo obtendremos del servicio AuthService
    name: '',
    description: '',
    price: 0,
    image: ''
  };
  // Variable para mostrar u ocultar el formulario de añadir producto
  showForm: boolean = false;

  // Inyección de dependencias en el constructor
  constructor(
    private productService: ProductServiceService,
    private authService: AuthService,
    private router: Router // Necesitamos el Router para redireccionar a otras páginas
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Obtenemos el ID del usuario autenticado y lo asignamos al nuevo producto
    this.newProduct.idUsuario = this.authService.getUserId() || '';
    // Cargamos los productos del usuario desde Firebase
    this.getProductsFromFirebase();
  }

  // Método para obtener productos del usuario desde Firebase
  async getProductsFromFirebase() {
    try {
      // Llamada al servicio para obtener los productos del usuario
      const products = await this.productService.getProductsByUserId(this.newProduct.idUsuario);
      // Asignamos los productos obtenidos a la variable local
      this.products = products;
    } catch (error) {
      console.error('Error al obtener productos de Firebase:', error);
    }
  }

  // Método para añadir un nuevo producto
  async addProduct() {
    try {
      // Llamada al servicio para añadir el nuevo producto
      await this.productService.addProduct(this.newProduct);
      // Actualizamos la lista de productos después de añadir uno nuevo
      this.getProductsFromFirebase();
      // Reseteamos el formulario
      this.newProduct = {
        id: '', // Se generará automáticamente al agregar el producto
        idUsuario: this.authService.getUserId() || '',
        name: '',
        description: '',
        price: 0,
        image: ''
      };
      // Ocultamos el formulario después de añadir el producto
      this.showForm = false;
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  }

  // Método para mostrar u ocultar el formulario de añadir producto
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Método para redireccionar a la página de edición de producto
  editProduct(product: Product) {
    // Usamos el router para navegar a la página de edición, pasando el ID del producto como parámetro
    this.router.navigate(['/edit-product', product.id]);
  }

  // Método para eliminar un producto
  async deleteProduct(productId: string) {
    try {
      // Llamada al servicio para eliminar el producto por su ID
      await this.productService.deleteProduct(productId);
      // Actualizamos la lista de productos después de eliminar uno
      this.getProductsFromFirebase();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  }
}
