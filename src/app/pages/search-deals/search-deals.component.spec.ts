import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDealsComponent } from './search-deals.component';

describe('SearchDealsComponent', () => {
  let component: SearchDealsComponent;
  let fixture: ComponentFixture<SearchDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
