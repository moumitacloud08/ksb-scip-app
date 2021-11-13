import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KsbTooltipComponent } from './ksb-tooltip.component';

describe('KsbTooltipComponent', () => {
  let component: KsbTooltipComponent;
  let fixture: ComponentFixture<KsbTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KsbTooltipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KsbTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
