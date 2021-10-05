import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import {
    NgxWebstorageModule,
    LocalStorageService,
} from 'ngx-webstorage';

import { HeaderService } from './header.service';

describe('HeaderService', () => {
    let service: HeaderService;
    let localStorageService: LocalStorageService;
    let userName: String = 'ksb';
    let password: String = 'ksb';

    let str1 = new String(userName);
    let str2 = new String(':' + password);
    let authToken: String = btoa(str1.concat(str2.toString()));
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NgxWebstorageModule.forRoot()],
            providers: [LocalStorageService],
        });

        localStorageService = TestBed.inject(LocalStorageService);
        let store = { "app": "scip", "key": "6765", "lang": "en", "user": { authToken: 'a3NiOmtzYg==' }, "api_token": "123456789" }
        spyOn(localStorageService, 'retrieve').and.callFake((key) => { return store[key] });
        service = TestBed.inject(HeaderService);
    });
    it('getPONum should return value in header service', () => {  
        let ponum= service.getPONum();
        expect("6765").toBe(ponum);
       
      });
      it('authtoken test in header service', () => {
        let authToken = service.setAuthToken()
        expect("a3NiOmtzYg==").toBe(authToken);
      });
      it('api token test in header service', () => {
        let apiToken = service.setAPIToken();
        expect("123456789").toBe(apiToken);
      });
      it('fetch details test', () => {
        spyOn(service, 'getPONum').and.returnValue("6765");
        spyOn(service, 'setAuthToken').and.returnValue("a3NiOmtzYg==");
        service.fetchmailId().then((data) => {
            expect(data).toBe('promise  value');
          });
      });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
