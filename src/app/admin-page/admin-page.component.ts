import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';
import { Department } from '../models/adminModel';
import { Transaction } from '../models/checkoutModel';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  departments: Department[] = []
  newDepartmentName: string = ''
  transactions: Transaction[] = []

  isEdit: boolean = false

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(item => {
      let reset: string | null = item.get('show')
      if (reset != null) {
        this.isEdit = false
        this.refreshPage()
      }
    })

    this.refreshPage()
  }

  refreshPage(): void {
    this.adminSrv.getDepartments()
      .subscribe(departments => {
        this.departments = departments

        this.departments.forEach(dep => {
          this.adminSrv.getProductsFromDepartment(dep.Name).subscribe(products => dep.addProducts(products))
        })
      })

    this.adminSrv.getTransactions().subscribe(t => this.transactions = t)
  }

  deleteProduct(UPC: number) {
    this.adminSrv.deleteProduct(UPC).subscribe(d => this.refreshPage())
  }

  editScreen(): void {
    this.isEdit = true
  }

  addNewDepartment(): void {
    this.adminSrv.addDepartment(this.newDepartmentName).subscribe(o => this.refreshPage())
  }

  deleteDepartment(departmentName: string): void {
    this.adminSrv.deleteDepartment(departmentName).subscribe(o => this.refreshPage())
  }

  constructor(private adminSrv: AdminService, private route: ActivatedRoute) { }
}
