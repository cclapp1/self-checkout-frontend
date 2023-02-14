import { Component } from '@angular/core';
import 'devextreme/data/odata/store'

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent {
  dataSource: any
  dataSourceDepartments: any

  prepEdit(event: any): void {
    if (event.caption == 'Upc' && !event.row.isNewRow) {
      event.editorOptions.disabled = true
    }
  }


  constructor() {
    this.dataSource = {
      store: {
        type: "odata",
        url: 'http://localhost:5090/odata/Products',
        key: 'Upc',
        version: 4,
      },
    }

    this.dataSourceDepartments = {
      store: {
        type: "odata",
        url: 'http://localhost:5090/odata/Departments',
        key: 'Upc',
        version: 4,
      }
    }

  }
}
