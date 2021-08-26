import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderLineItemComponent } from './purchase-order-line-item.component';

describe('PurchaseOrderLineItemComponent', () => {
  let component: PurchaseOrderLineItemComponent;
  let fixture: ComponentFixture<PurchaseOrderLineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderLineItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
