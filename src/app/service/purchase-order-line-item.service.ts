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
  private purchaseOrderUpdateURL = cons.BASE_URL + '/purchaseorders/9/updatelineitems';
  fetchPurchaseDetails() {
     httpOptions.headers = new HttpHeaders({
        api_token: this.setAPIToken(),
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + this.setAuthToken(),
      });
    return this.http.get(this.purchaseOrderURL,httpOptions).toPromise();
  }
  fetchPurchaseDetailsTestData() {
   return this.http.get('./assets/purchasedetail.json').toPromise();
 }
  savePurchaseorderLine(paramObj) {
    httpOptions.headers = new HttpHeaders({
       api_token: this.setAPIToken(),
       'Content-Type': 'application/json',
       Authorization: 'Basic ' + this.setAuthToken(),
     });
   return this.http.put(this.purchaseOrderUpdateURL,paramObj,httpOptions).toPromise();
 }
}
