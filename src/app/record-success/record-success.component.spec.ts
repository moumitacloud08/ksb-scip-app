import { ComponentFixture, TestBed,fakeAsync } from '@angular/core/testing';

import { RecordSuccessComponent } from './record-success.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NgxWebstorageModule,
  LocalStorageService,
} from 'ngx-webstorage';
import { TranslateService, TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
describe('RecordSuccessComponent', () => {
  let component: RecordSuccessComponent;
  let fixture: ComponentFixture<RecordSuccessComponent>;
  let localStorageService: LocalStorageService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordSuccessComponent],
      imports: [RouterTestingModule, NgxWebstorageModule.forRoot(), TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateFakeLoader
        }
      })],
      providers:[LocalStorageService, TranslateService,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordSuccessComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.inject(LocalStorageService);
    let store = { "app": "scip", "key": "6765", "lang": "en", "user": { authToken: 'a3NiOmtzYg==' }, "api_token": "123456789" }
    spyOn(localStorageService, 'retrieve').and.callFake((key) => { return store[key] });
    fixture.detectChanges();
  });
  it('SCIP to be blank', fakeAsync(() => {
    let spy = spyOn(component, 'routeWithQueryParams').and.returnValue();
    component.goToLogin();
    expect(spy).toHaveBeenCalled()
    //expect(component.lang).toBe("en");
}));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
