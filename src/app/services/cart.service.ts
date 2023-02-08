import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Product } from '../models/adminModel';
import { Transaction, TrimmedProduct } from '../models/checkoutModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = 'http://localhost:5090/selfCheckout'

  getProduct(UPC: string): Observable<TrimmedProduct> {
    return this.http.get(`${this.baseUrl}/getProduct/${UPC}`).pipe(map((product: any) => {
      return new TrimmedProduct(product.upc, product.name, product.price, product.saleModifier)
    })

    )
  }

  getTaxRate(): Observable<number> {
    return this.http.get(`${this.baseUrl}/getTaxRate`).pipe(map((data: any) => data))
  }

  sendTransaction(transaction: Transaction): Observable<string> {
    return this.http.post(`${this.baseUrl}/checkout`, transaction).pipe(map((data: any) => data))
  }

  checkPassword(password: string): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/checkPassword/${password}`).pipe(map((isPasswordValid: any) => isPasswordValid))
  }

  constructor(private http: HttpClient) { }
}
