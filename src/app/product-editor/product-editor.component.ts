import { Component } from '@angular/core';
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

  newProduct: boolean = false

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.adminSrv.getDepartments().subscribe(departments => this.departments = departments)
      let UPC: string | null = param.get('UPC')
      if (UPC != null) {
        this.adminSrv.getProduct(UPC).subscribe(p => {
          this.product = p
        })
      } else {
        this.product = new Product()
        this.product.discontinued = false
        this.product.taxedTf = false
        this.newProduct = true
      }
    })
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
    this.router.navigate(['admin'], { queryParams: { show: true } })
  }

  cancel(): void {
    this.router.navigate(['admin'], { queryParams: { show: true } })
  }

  constructor(private route: ActivatedRoute, private adminSrv: AdminService, private router: Router) { }

}
