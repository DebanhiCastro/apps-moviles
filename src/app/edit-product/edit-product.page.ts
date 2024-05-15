import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  productId: string = '0';
  product: Product = {
    id: '0',
    idUsuario: '',
    name: '',
    description: '',
    price: 0,
    image: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductServiceService
  ) {}

  ngOnInit() {
    
    this.productId = this.route.snapshot.paramMap.get('id') ?? '1';

    this.loadProduct();
  }

  async loadProduct() {
    const product = await this.productService.getProductById(this.productId);
    if (product !== null) {
      this.product = product;
    } else {
      console.error(`No se encontró ningún producto con el ID ${this.productId}`);
      // Puedes mostrar un mensaje o redirigir a una página de error aquí si lo deseas
    }
  }

  async saveChanges() {
    await this.productService.updateProduct(this.product.id,this.product);
    this.router.navigate(['/product-details', this.productId]);
  }
}
