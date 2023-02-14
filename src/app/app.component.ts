import { Component, Host, HostBinding, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'self-checkout-frontend';

  constructor(private render: Renderer2) {
    this.render.setAttribute(document.body, 'data-bs-theme', 'dark')
  }
}
