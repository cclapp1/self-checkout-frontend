import { Component, HostBinding, ViewChild } from '@angular/core';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { Product } from '../models/adminModel';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent {
  products: Product[] | undefined

  @ViewChild('closeModal') closeModal: any

  ngOnInit(): void {
    this.adminSrv.getAllProducts().subscribe(p => this.products = p)
  }

  editorDone(): void {
    this.closeModal.nativeElement.click()
    this.ngOnInit()
  }

  deleteProduct(product: Product): void {
    this.adminSrv.deleteProduct(product.upc!).subscribe(d => this.ngOnInit())
  }



  constructor(private adminSrv: AdminService) { }

}
