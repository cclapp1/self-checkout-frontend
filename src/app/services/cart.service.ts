import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart, Transaction, TrimmedProduct } from '../models/checkoutModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = 'http://localhost:5090/selfCheckout'

  getProduct(UPC: string): Observable<TrimmedProduct> {
    return this.http.get(`${this.baseUrl}/getProduct/${UPC}`).pipe(map((product: any) => {
      return new TrimmedProduct({ upc: product.upc, name: product.name, singleCost: product.price, saleModifier: product.saleModifier, isTaxed: product.isTaxed })
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

  getCart(cartID: string): Observable<Cart> {
    return this.http.get(`http://localhost:5090/cart/${cartID}`).pipe(map((cart: any) => {
      let newCart = new Cart(cart)
      newCart.products = cart.products.map((p: any) => {
        return new TrimmedProduct(p)
      })
      return newCart
    }))
  }

  saveCart(products: TrimmedProduct[]): Observable<string> {
    return this.http.post(`http://localhost:5090/cart`, products).pipe(map((str: any) => str))
  }

  updateCart(cart: Cart): Observable<string> {
    return this.http.patch(`http://localhost:5090/cart`, cart).pipe(map((str: any) => str))
  }

  constructor(private http: HttpClient) { }
}
