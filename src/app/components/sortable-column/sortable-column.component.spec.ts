import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableColumnComponent } from './sortable-column.component';

describe('SortableColumnComponent', () => {
  let component: SortableColumnComponent;
  let fixture: ComponentFixture<SortableColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortableColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
