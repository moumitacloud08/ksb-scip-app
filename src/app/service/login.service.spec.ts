import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  NgxWebstorageModule,
  LocalStorageService,
} from 'ngx-webstorage';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let httpTestingController: HttpTestingController;
  let service: LoginService;
  let localStorageService: LocalStorageService;
  let userName: String = 'ksb';
  let password: String = 'ksb';

  let str1 = new String(userName);
  let str2 = new String(':' + password);
  let authToken: String = btoa(str1.concat(str2.toString()));
  let authObject = {
    authToken: authToken,
    valid: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxWebstorageModule.forRoot()],
      providers: [LocalStorageService],
    });
    
    localStorageService = TestBed.inject(LocalStorageService);
    let store = {"app":"scip","key":"6765","lang":"en","user":{authToken:'a3NiOmtzYg=='},"api_token":"123456789"}
    spyOn(localStorageService, 'retrieve').and.callFake((key) =>{return store[key]});
    service = TestBed.inject(LoginService);
  
    //httpTestingController = TestBed.get(HttpTestingController);
  });

  it('getPONum should return value', () => {  
    let ponum= service.getPONum();
    expect("6765").toBe(ponum);
   
  });
  it('handle error test', () => {  
   let error = { status: '403', message: 'Error Occurred' };
   service.handleError(error);
   expect(service.errorMessage).toBe(error.message);
   
  });

  
 
  it('login should return Observable', () => {
    spyOn(service, 'getPONum').and.returnValue("6765");


    let str1 = new String('ksb'); 
    let str2 = new String( ":"+'ksb'); 
    let authToken:string = btoa(str1.concat(str2.toString())) 

    service.login('123456789',authToken).subscribe((value) => {
      expect(value).toBe('observable value');
    });
  });

  it('LoginService should be created', () => {
    expect(service).toBeTruthy();
  });
});
