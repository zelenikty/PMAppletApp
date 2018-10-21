import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotUnallocatedComponent } from './spot-unallocated.component';

describe('SpotUnallocatedComponent', () => {
  let component: SpotUnallocatedComponent;
  let fixture: ComponentFixture<SpotUnallocatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotUnallocatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotUnallocatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
