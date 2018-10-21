import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmCardComponent } from './pm-card.component';

describe('PmCardComponent', () => {
  let component: PmCardComponent;
  let fixture: ComponentFixture<PmCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
