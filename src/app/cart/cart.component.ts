import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Cart, Transaction, TransactionProduct } from '../models/checkoutModel';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @Input() cart!: Cart
  transactionID: string = ''
  paymentCard: string = ''

  errorMessage: string = ''
  showError: boolean = false

  checkout(): void {
    this.showError = false
    let transaction = new Transaction(
      this.cart.calculateCost(),
      this.paymentCard,
      this.cart.products.map(p => new TransactionProduct(p.upc, p.quantity))
    )

    this.cartSrv.sendTransaction(transaction).subscribe({
      next: (transactionDone) => {

        this.cart.products = []
        console.log(transactionDone)
        this.transactionID = transactionDone
      }, error: (e) => {
        this.errorMessage = e.error
        this.showError = true
      }
    })
  }

  saveCart(): void {
    if (this.cart.id) {
      this.updateCart()
    } else {
      this.cartSrv.saveCart(this.cart.products).subscribe(cartID => this.cart.id = Number(cartID))
    }
  }

  updateCart(): void {
    this.cartSrv.updateCart(this.cart).subscribe()
  }

  constructor(private cartSrv: CartService) { }

}
