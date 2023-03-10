import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Product } from '../models/adminModel';
import { Cart, TrimmedProduct } from '../models/checkoutModel';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  currentUPC: string = ''
  cart: Cart = new Cart({ taxRate: 0 })
  showScanner: boolean = false

  errorMessage: string = ''
  showError: boolean = false

  scannedCode(code: string) {
    this.currentUPC = code.substring(1, code.length)
    this.manualCode()
  }

  manualCode() {
    this.showError = false
    if (!this.cart.products.find(p => p.upc == this.currentUPC)) {
      this.cartSrv.getProduct(this.currentUPC)
        .pipe(
          catchError(err => of(new TrimmedProduct({ name: 'error', upc: 'error', singleCost: 0, saleModifier: 0, isTaxed: false })))
        )
        .subscribe(product => {
          if (product.name != 'error') {
            this.cart.addProduct(product)
          } else {
            this.errorMessage = 'Error: UPC does not exist'
            this.showError = true
          }
        })
    } else {
      let productIndex: number = this.cart.products.findIndex(p => p.upc == this.currentUPC)
      this.cart.products[productIndex].increaseQuantity()
    }
  }

  ngOnInit(): void {
    this.cartSrv.getTaxRate().subscribe(rate => this.cart.taxRate = rate)
  }

  loadCart(): void {
    if (this.cart.id) {
      this.cartSrv.getCart(String(this.cart.id)).subscribe({
        next: (cart) => {
          this.cart = cart
        },
        error: (err) => {
          this.cart = new Cart({ taxRate: this.cart.taxRate })
        }
      })

    }

  }

  constructor(private cartSrv: CartService) { }
}
