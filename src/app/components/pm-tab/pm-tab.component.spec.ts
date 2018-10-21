import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmTabComponent } from './pm-tab.component';

describe('PmTabComponent', () => {
  let component: PmTabComponent;
  let fixture: ComponentFixture<PmTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
