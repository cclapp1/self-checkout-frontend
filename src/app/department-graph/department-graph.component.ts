import { Component } from '@angular/core';
import { DepartmentWithProductCount } from '../models/graph';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-department-graph',
  templateUrl: './department-graph.component.html',
  styleUrls: ['./department-graph.component.scss']
})
export class DepartmentGraphComponent {
  dataSource: DepartmentWithProductCount[] = []

  chart_visualRange: number[] = [50, 70]

  findDepartmentsWithProducts(): void {
    this.adminSrv.getDepartments().subscribe(departments => {
      departments.forEach(department => {
        this.adminSrv.getProductsFromDepartment(department.Name).subscribe(products => {
          this.dataSource.push(new DepartmentWithProductCount(department.Name, products.length))
        })
      })
    })
  }

  constructor(private adminSrv: AdminService) {
    this.findDepartmentsWithProducts()
  }

}
