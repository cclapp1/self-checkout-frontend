import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { FormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CartComponent } from './cart/cart.component';
import { AdminTableComponent } from './admin-table/admin-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminPageComponent,
    ProductEditorComponent,
    CheckoutPageComponent,
    BarcodeScannerComponent,
    CartComponent,
    AdminTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
