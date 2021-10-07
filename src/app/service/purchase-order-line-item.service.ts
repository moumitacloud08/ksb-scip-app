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
 
  getPONum(){
    let key = this.localStorageService.retrieve("key")
    return key;
  }
  
  
  //private purchaseOrderURL = cons.BASE_URL + '/purchaseorders/'+this.getPONum();
  //private purchaseOrderUpdateURL = cons.BASE_URL + '/purchaseorders/'+this.getPONum()+'/updatelineitems';
  fetchPurchaseDetails() {
    let purchaseOrderURL = cons.BASE_URL + '/purchaseorders/'+this.getPONum();
     httpOptions.headers = new HttpHeaders({
        api_token: this.setAPIToken(),
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + this.setAuthToken(),
      });
    return this.http.get(purchaseOrderURL,httpOptions).toPromise();
  }
  fetchPurchaseDetailsTestData() {
   return this.http.get('./assets/purchasedetail.json').toPromise();
 }
  savePurchaseorderLine(paramObj) {
    let purchaseOrderUpdateURL = cons.BASE_URL + '/purchaseorders/'+this.getPONum()+'/updatelineitems';
    httpOptions.headers = new HttpHeaders({
       api_token: this.setAPIToken(),
       'Content-Type': 'application/json',
       Authorization: 'Basic ' + this.setAuthToken(),
     });
   return this.http.put(purchaseOrderUpdateURL,paramObj,httpOptions).toPromise();
 }
}
