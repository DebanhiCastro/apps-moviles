import { Component, EventEmitter, Input, OnInit, Output, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Product } from '../models/product';

@Component({
  standalone:true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Agrega esta línea
})
export class ProductListComponent  implements OnInit {
  @Input() products: Product[] = [];
  @Output() viewProductDetails = new EventEmitter<Product>();

  constructor() {}

  viewDetails(product: Product) {
    this.viewProductDetails.emit(product);
  }

  ngOnInit(): void {}

}
