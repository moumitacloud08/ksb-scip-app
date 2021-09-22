import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSuccessComponent } from './record-success.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecordSuccessComponent', () => {
  let component: RecordSuccessComponent;
  let fixture: ComponentFixture<RecordSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordSuccessComponent ],
      imports: [RouterTestingModule]
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
