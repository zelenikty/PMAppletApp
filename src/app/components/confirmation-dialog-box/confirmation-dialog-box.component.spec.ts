import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogBoxComponent } from './confirmation-dialog-box.component';

describe('ConfirmationDialogBoxComponent', () => {
  let component: ConfirmationDialogBoxComponent;
  let fixture: ComponentFixture<ConfirmationDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
