import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsUrl = 'api/products';
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap((data) => console.log(JSON.stringify(data)))
      // catchError(this.handleError)
    );
  }
  getProduct(id: number): Observable<Product> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap((data) => console.log(JSON.stringify(data)))
      // ,catchError(this.handleError)
    );
  }

  private initializeProduct(): Product {
    return {
      id: 0,
      productName: '',
      productCode: '',
      tags: [''],
      releaseDate: '',
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: '',
    };
  }


  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = 0;
    return this.http.post<Product>(this.productsUrl, product, { headers }).pipe(
      tap((data) => console.log('createProduct: ' + JSON.stringify(data))),
     // catchError(this.handleError)
    );
  }
}
