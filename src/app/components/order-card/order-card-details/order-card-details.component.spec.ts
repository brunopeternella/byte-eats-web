import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCardDetailsComponent } from './order-card-details.component';

describe('OrderCardDetailsComponent', () => {
  let component: OrderCardDetailsComponent;
  let fixture: ComponentFixture<OrderCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCardDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
