import {Component, OnInit, signal} from '@angular/core';
import {ProductsComponent} from './components/products.component';
import {Product} from './models/product';
import {FormComponent} from './components/form.component';
import Swal from 'sweetalert2';
import {ProductService} from './services/product.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ProductsComponent, FormComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  msg: String = ''
  products: Product[] = [];
  countId = signal(3)
  productSelected: Product = {id: 0, name: '', description: '', price: 0}

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.findAll().subscribe(msg => {
      console.log(msg);
      this.msg = msg
    });
    this.products = [
      {
        id: 1,
        name: 'Monitor Asus 35 pulgadas',
        price: 1000,
        description: 'Buen monitor'
      },
      {
        id: 2,
        name: 'Iphone Pro',
        price: 1700,
        description: 'Es muy de Apple'
      }
    ]
  }

  addProduct(product: Product): void {
    if (product.id > 0) {
      this.products = this.products.map(prod => {
        if (prod.id == product.id) {
          return {... product} // Cuando se modifica, se devuelve nueva instancia con los nuevos datos
        } else {
          return prod // Cuando no se modifica, se vevuelve el mismo
        }})
      Swal.fire({
        title:"Producto actualizado",
        text:"Producto actualizado con éxito",
        icon:"success"
      })
    } else {
      this.products = [...this.products, {...product, id: this.countId()}]
      this.countId.update(id => id + 1);
      Swal.fire({
        title:"Producto creado",
        text:"Producto creado con éxito",
        icon:"success"
      })
    }
  }

  updateProduct(product: Product): void {
    this.productSelected = {...product};
  }

  removeProduct(id: Number): void {
    Swal.fire({
      title:"¿Desea eliminar el producto?",
      text:"Los cambios no podrán revertirse",
      icon:"warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"}).then((result) => {
        if (result.isConfirmed) {
          this.products = this.products.filter(product => product.id !== id);
          Swal.fire({
            title:"Producto eliminado",
            text:"Producto eliminado con éxito",
            icon:"success"
          })
        }
    });
  }
}
