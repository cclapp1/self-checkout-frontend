import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentGraphComponent } from './department-graph.component';

describe('DepartmentGraphComponent', () => {
  let component: DepartmentGraphComponent;
  let fixture: ComponentFixture<DepartmentGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
