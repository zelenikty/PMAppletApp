import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturePanelComponent } from './capture-panel.component';

describe('CapturePanelComponent', () => {
  let component: CapturePanelComponent;
  let fixture: ComponentFixture<CapturePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
