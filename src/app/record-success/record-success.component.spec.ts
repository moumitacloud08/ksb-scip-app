import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSuccessComponent } from './record-success.component';

describe('RecordSuccessComponent', () => {
  let component: RecordSuccessComponent;
  let fixture: ComponentFixture<RecordSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
