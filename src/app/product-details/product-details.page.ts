import { Component, OnInit } from '@angular/core';  // Importa Component y OnInit de Angular
import { ActivatedRoute, Router } from '@angular/router';  // Importa ActivatedRoute y Router para manejar la navegación y rutas
import { Product } from '../models/product';  // Importa la interfaz Product que define la estructura de un producto
import { AlertController } from '@ionic/angular';  // Importa AlertController de Ionic para mostrar alertas
import { ProductServiceService } from '../services/product-service.service';  // Importa el servicio de productos

@Component({
  selector: 'app-product-details',  // Define el selector para este componente
  templateUrl: './product-details.page.html',  // Ruta al archivo de plantilla HTML
  styleUrls: ['./product-details.page.scss'],  // Ruta al archivo de estilos SCSS
})
export class ProductDetailsPage implements OnInit {  // Define la clase ProductDetailsPage e implementa OnInit
  productId: string = '0';  // Inicializa la variable productId
  product: Product = {  // Inicializa la variable product con un producto vacío según la estructura de la interfaz Product
    id: '0',
    idUsuario: '',
    name: '',
    description: '',
    price: 0,
    image: '',
  };

  constructor(
    private route: ActivatedRoute,  // Inyecta ActivatedRoute para acceder a los parámetros de la ruta
    private router: Router,  // Inyecta Router para la navegación programática
    private alertController: AlertController,  // Inyecta AlertController para mostrar alertas
    private productService: ProductServiceService  // Inyecta ProductServiceService para acceder a los métodos del servicio de productos
  ) {}

  async ngOnInit() {  // Implementa ngOnInit, que se ejecuta al inicializar el componente
    const productIdParam = this.route.snapshot.paramMap.get('id');  // Obtiene el parámetro 'id' de la ruta
    if (productIdParam !== null) {
      this.productId = productIdParam;  // Asigna el parámetro de ruta a la variable productId
      const product = await this.productService.getProductById(this.productId);  // Llama al servicio para obtener el producto por su ID
      if (product !== null) {
        this.product = product;  // Asigna el producto obtenido a la variable product
      } else {
        console.error(`No se encontró ningún producto con el ID ${this.productId}`);  // Muestra un error si no se encuentra el producto
        // Puedes mostrar un mensaje o redirigir a una página de error aquí si lo deseas
      }
    }
  }

  async addToCart() {  // Método para agregar el producto al carrito
    const alert = await this.alertController.create({
      header: 'Carrito de compra',  // Título de la alerta
      message: 'Producto agregado al carrito.',  // Mensaje de la alerta
      buttons: ['OK'],  // Botón de la alerta
    });

    await alert.present();  // Muestra la alerta
  }

}
