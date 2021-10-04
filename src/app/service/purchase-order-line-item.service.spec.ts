import { TestBed } from '@angular/core/testing';
import {
    NgxWebstorageModule,
    LocalStorageService,
  } from 'ngx-webstorage';
  import {
    HttpClientTestingModule,
  } from '@angular/common/http/testing';
import { PurchaseOrderLineItemService } from './purchase-order-line-item.service';


describe('PurchaseOrderLineItemService', () => {
  let service: PurchaseOrderLineItemService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[HttpClientTestingModule, NgxWebstorageModule.forRoot()],
        providers:[LocalStorageService]
    });
    localStorageService = TestBed.inject(LocalStorageService);
    let store = {"app":"scip","key":"6765","lang":"en","user":{authToken:'a3NiOmtzYg=='},"api_token":"123456789"}
    spyOn(localStorageService, 'retrieve').and.callFake((key) =>{return store[key]});
    service = TestBed.inject(PurchaseOrderLineItemService);
  });

  it('authtoken test', () => {
    let authToken = service.setAuthToken()
    expect("a3NiOmtzYg==").toBe(authToken);
  });
  it('api token test', () => {
    let apiToken = service.setAPIToken();
    expect("123456789").toBe(apiToken);
  });
  it('fetch details test', () => {
    spyOn(service, 'getPONum').and.returnValue("6765");
    spyOn(service, 'setAuthToken').and.returnValue("a3NiOmtzYg==");
    service.fetchPurchaseDetails().then((data) => {
        expect(data).toBe('promise  value');
      });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
