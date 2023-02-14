import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { DepartmentGraphComponent } from './department-graph/department-graph.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent
  },
  {
    path: 'dataGrid',
    component: DataGridComponent
  },
  {
    path: 'departmentGraph',
    component: DepartmentGraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
