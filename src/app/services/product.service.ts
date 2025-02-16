import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "https://datosabiertos.malaga.eu/api/3/action/datastore_search?resource_id=441d7951-a667-44b6-b054-32af3dafbe54";

  constructor(private http: HttpClient) { }

  findAll(): Observable<String> {
    return this.http.get<any>(this.url);
  }

  /*
  findAll(): Observable<Product[]> {
    return this.http.get(this.url).pipe(
      map((response: any) => response as Product[])
    );
  }*/

  findAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }

  delete(productId: Number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${productId}`);
  }

}
