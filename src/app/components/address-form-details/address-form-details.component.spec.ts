import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormDetailsComponent } from './address-form-details.component';

describe('AddressFormDetailsComponent', () => {
  let component: AddressFormDetailsComponent;
  let fixture: ComponentFixture<AddressFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressFormDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
