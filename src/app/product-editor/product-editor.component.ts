import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department, Product } from '../models/adminModel';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent {
  product: Product | undefined
  departments: Department[] | undefined

  @Output() doneMessage: EventEmitter<void> = new EventEmitter<void>()
  @Input() UPC: number = 0

  newProduct: boolean = false

  ngOnInit(): void {
    this.adminSrv.getDepartments().subscribe(departments => this.departments = departments)

    if (this.UPC != 0) {
      this.adminSrv.getProduct(String(this.UPC)).subscribe(p => {
        this.product = p
      })
    } else {
      this.product = new Product()
      this.product.discontinued = false
      this.product.taxedTf = false
      this.newProduct = true
    }
  }

  submit(): void {
    if (this.product) {
      let depIndex: number = this.departments!.findIndex(dep => dep.Name === this.product?.departmentName)
      this.product.departmentId = this.departments![depIndex].ID

      if (this.newProduct) {
        this.adminSrv.addProduct(this.product).subscribe(d => this.done())
      } else {
        this.adminSrv.updateProduct(this.product).subscribe(d => this.done())
      }
    }
  }

  done(): void {
    this.doneMessage.emit()
  }

  cancel(): void {
    this.doneMessage.emit()
  }

  constructor(private route: ActivatedRoute, private adminSrv: AdminService, private router: Router) { }

}
