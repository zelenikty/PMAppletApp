import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealTypeSelectionComponent } from './deal-type-selection.component';

describe('DealTypeSelectionComponent', () => {
  let component: DealTypeSelectionComponent;
  let fixture: ComponentFixture<DealTypeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealTypeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
