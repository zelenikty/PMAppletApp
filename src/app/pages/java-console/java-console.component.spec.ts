import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaConsoleComponent } from './java-console.component';

describe('JavaConsoleComponent', () => {
  let component: JavaConsoleComponent;
  let fixture: ComponentFixture<JavaConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JavaConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
