import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { AlertController } from '@ionic/angular';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  productId: string = '0';
  product: Product = {
    id: '0',
    idUsuario: '',
    name: '',
    description: '',
    price: 0,
    image: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private productService: ProductServiceService
  ) {}

  async ngOnInit() {
    const productIdParam = this.route.snapshot.paramMap.get('id');
    if (productIdParam !== null) {
      this.productId = productIdParam;
      const product = await this.productService.getProductById(this.productId);
      if (product !== null) {
        this.product = product;
      } else {
        console.error(`No se encontró ningún producto con el ID ${this.productId}`);
        // Puedes mostrar un mensaje o redirigir a una página de error aquí si lo deseas
      }
    }
  }

  async addToCart() {
    const alert = await this.alertController.create({
      header: 'Carrito de compra',
      message: 'Producto agregado al carrito.',
      buttons: ['OK'],
    });

    await alert.present();
  }

 /* editProduct() {
    console.log("editar")
    this.router.navigate(['/edit-product', this.productId]);
  }
/*
  async deleteProduct() {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Lógica para eliminar el producto
            this.productService.deleteProduct(this.productId).then(() => {
              this.router.navigate(['/home']); // Redirigir a la página principal después de eliminar
            }).catch(error => {
              console.error("Error al eliminar el producto:", error);
            });
          }
        }
      ]
    });

    await alert.present();
  }
  */
}
