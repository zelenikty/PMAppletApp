import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmTabContentComponent } from './pm-tab-content.component';

describe('PmTabContentComponent', () => {
  let component: PmTabContentComponent;
  let fixture: ComponentFixture<PmTabContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmTabContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmTabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
