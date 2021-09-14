import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  NgxWebstorageModule,
  LocalStorageService,
  LocalStorage,
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
    service = TestBed.inject(LoginService);
    //httpTestingController = TestBed.get(HttpTestingController);
  });

  it('setAuthToken should be a value', () => {
    spyOn(localStorageService, 'retrieve').and.returnValue(authObject);
    expect(service.setAuthToken()).toBe('a3NiOmtzYg==');
  });

  it('login should return Observable', () => {
    spyOn(localStorageService, 'retrieve').and.returnValue(authObject);

    service.login('123456789').subscribe((value) => {
      expect(value).toBe('observable value');
    });
  });

  it('LoginService should be created', () => {
    expect(service).toBeTruthy();
  });
});
