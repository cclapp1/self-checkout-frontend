import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  password: string = ''
  showPasswordInput: boolean = false

  adminPage(): void {
    this.showPasswordInput = true
  }

  navigateToAdmin(): void {
    this.cartSrv.checkPassword(this.password).subscribe(isPasswordValid => {
      if (isPasswordValid) {
        this.router.navigateByUrl('admin')
      }
    })
  }

  constructor(private cartSrv: CartService, private router: Router) { }

}
