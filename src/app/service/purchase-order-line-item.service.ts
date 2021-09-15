import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as cons from '../constants';
import { LocalStorageService } from 'ngx-webstorage';

const httpOptions = {
  headers: new HttpHeaders({
    api_token: '',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderLineItemService {
  constructor(private http: HttpClient,private localStorageService: LocalStorageService) {}
  setAuthToken() {
    let authToken: String = this.localStorageService.retrieve('user').authToken;
    return authToken;
  }
  setAPIToken() {
    let apiToken: string = this.localStorageService.retrieve('api_token');
    return apiToken;
  }

  
  private purchaseOrderURL = cons.BASE_URL + '/purchaseorders/77';
  fetchPurchaseDetails() {
     httpOptions.headers = new HttpHeaders({
        api_token: this.setAPIToken(),
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + this.setAuthToken(),
      });
    return this.http.get(this.purchaseOrderURL,httpOptions).toPromise();
  }
}
