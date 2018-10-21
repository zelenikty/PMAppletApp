import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalInfosComponent } from './technical-infos.component';

describe('TechnicalInfosComponent', () => {
  let component: TechnicalInfosComponent;
  let fixture: ComponentFixture<TechnicalInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
