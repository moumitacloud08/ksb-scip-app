import {
  inject,
  tick,
  TestBed,
  getTestBed,
  async,
  fakeAsync,
  ComponentFixture,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {
  NgxWebstorageModule,
  LocalStorageService,
} from 'ngx-webstorage';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateService, TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;
  let localStorageService: LocalStorageService;
 // const location: Location = TestBed.inject(Location);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxWebstorageModule.forRoot(),
        RouterTestingModule,
        TranslateTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        FormsModule
      ],
      declarations: [LoginComponent],
      providers: [LocalStorageService, TranslateService,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LoginService);
    localStorageService = TestBed.inject(LocalStorageService);
    spyOn(localStorageService, 'clear').and.returnValue();
    //spyOn(localStorageService, 'store').and.returnValue("6765");
    let store = {"app":"scip","key":"6765","lang":"en","user":{authToken:'a3NiOmtzYg=='},"api_token":"123456789"}
    spyOn(localStorageService, 'retrieve').and.callFake((key) =>{return store[key]});
    
    fixture.detectChanges();
  });


  it('Test ngOnInit', fakeAsync(() => {
    spyOn(component, 'ngOnInit').and.returnValue();
    expect(component.key).toBe("6765");
    expect(component.appl).toBe("scip");
    expect(component.lang).toBe("en");
  }));
  

  it('Test authenticate EqualTo', fakeAsync(() => {
    const testForm = <NgForm>{
      value: {
        tokenInput: '123456789',
      },
    };

    let message = [{ code: '200', type: 'String', message: 'Login Success' }];
    spyOn(service, 'login').and.returnValue(of([message]));
    component.authenticate(testForm);
    expect(component.messages.length).toBe(1);
  }));
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});








// import {
//   inject,
//   tick,
//   TestBed,
//   getTestBed,
//   async,
//   fakeAsync,
//   ComponentFixture,
// } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { Router } from '@angular/router';
// import { LocalStorageService } from 'ngx-webstorage';

// import { UtilService } from '../util.service';
// import { LoginService } from '../service/login.service';
// import { Observable } from 'rxjs';
// import { of } from 'rxjs';
// import { NgForm } from '@angular/forms';
// import { Message } from '../message.model';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let service: LoginService;
//   beforeEach(() => {
//     service = new LoginService(null,null);
//     component = new LoginComponent(service, new UtilService(), null, null,null,null);
//   });

//   it('Test authenticate EqualTo', fakeAsync(() => {
//     const testForm = <NgForm>{
//       value: {
//         tokenInput: '123456789',
//       },
//     };

//     let message = [{ code: '200', type: 'String', message: 'Login Success' }];
//     spyOn(service, 'login').and.returnValue(of([message]));
//     component.authenticate(testForm);
//     expect(component.messages.length).toBe(1);
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
