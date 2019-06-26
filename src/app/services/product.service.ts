import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/product';
import { shareReplay, flatMap, first } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = "https://localhost:44390/api/product/";

  constructor(private http: HttpClient) { }

  private product$: Observable<Product[]>;

  //list products
  getProducts(): Observable<Product[]> {
    if (!this.product$) {
      this.product$ = this.http.get<Product[]>(this.baseUrl + "GetProducts").pipe(shareReplay());
    }
    return this.product$;
  }

  //product by id
  getProductById(id: number): Observable<Product> {
    return this.getProducts().pipe(flatMap(result => result), first(product => product.productId == id));
  }

  //insert product
  insertProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + "AddProduct", newProduct);
  }

  //update product
  updateProduct(id: number, editProduct: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + "UpdateProduct/" + id, editProduct);
  }

  //delete product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + "DeleteProduct/" + id);
  }

  //clear cache
  clearCache() {
    this.product$ = null;
  }
}
