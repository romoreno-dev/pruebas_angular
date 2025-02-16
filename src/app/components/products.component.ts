import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../models/product';

@Component({
  selector: 'table-product',
  imports: [],
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  title : string = 'Listado de productos';

  // Emitir objeto producto al padre
  @Output() updateProductEvent = new EventEmitter();
  onUpdateProduct(product: Product): void {
    this.updateProductEvent.emit(product);
  }

  // Emitir el id al padre
  @Output() removeProductEvent = new EventEmitter();
  onRemoveProduct(id: number): void {
    this.removeProductEvent.emit(id)
  }

}
