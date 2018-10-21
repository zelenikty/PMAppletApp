import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDeliveryComponent } from './payment-delivery.component';

describe('PaymentDeliveryComponent', () => {
  let component: PaymentDeliveryComponent;
  let fixture: ComponentFixture<PaymentDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
