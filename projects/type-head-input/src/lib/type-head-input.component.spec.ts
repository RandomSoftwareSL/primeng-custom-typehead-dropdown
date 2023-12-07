import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeHeadInputComponent } from './type-head-input.component';

describe('TypeHeadInputComponent', () => {
  let component: TypeHeadInputComponent;
  let fixture: ComponentFixture<TypeHeadInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeHeadInputComponent]
    });
    fixture = TestBed.createComponent(TypeHeadInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
