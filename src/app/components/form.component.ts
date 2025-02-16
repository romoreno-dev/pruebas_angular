import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../models/product';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'product-form',
  imports: [FormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent {

  @Input() product: Product = this.newProduct()

  @Output() addProductEvent = new EventEmitter();

  onSubmit(productForm: NgForm) : void {
    if (productForm.valid) {
      console.log(this.product);
      this.addProductEvent.emit(this.product);
      this.clean()
      productForm.reset(); // Limpia controles, validaciones....
      productForm.resetForm();
    }
  }

  clean(): void {
    this.product = this.newProduct()
  }

  newProduct(): Product {
    return {
      id: 0,
      name: '',
      description: '',
      price: 0
    };
  }

}
