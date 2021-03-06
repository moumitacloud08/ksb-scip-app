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
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }
  setAuthToken() {
    let authToken: String = this.localStorageService.retrieve('user').authToken;
    return authToken;
  }
  setAPIToken() {
    let apiToken: string = this.localStorageService.retrieve('api_token');
    return apiToken;
  }

  getPONum() {
    let key = this.localStorageService.retrieve("key")
    return key;
  }



  fetchPurchaseDetails(poNum: string, uniqueKey: string) {
    let purchaseOrderURL = "";
    purchaseOrderURL = cons.BASE_URL + '/purchaseorders/' + uniqueKey;
    if (poNum == null || poNum == '' || poNum == undefined) {
      purchaseOrderURL = cons.BASE_URL + '/purchaseorders/' + this.getPONum();
    }


    httpOptions.headers = new HttpHeaders({
      api_token: this.setAPIToken(),
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + this.setAuthToken(),
    });
    return this.http.get(purchaseOrderURL, httpOptions).toPromise();
  }
  fetchPurchaseDetailsTestData(poNum: String, uniqueKey: string) {
    console.log("uniqueKey : "+uniqueKey);
    if (uniqueKey != '')
      return this.http.get('./assets/singlePOOrderDetail.json').toPromise();
    return this.http.get('./assets/purchasedetail.json').toPromise();
  }

  fetcPOSList() {
    let posURL = cons.BASE_URL + '/purchaseorders/pos/' + this.getPONum();
    httpOptions.headers = new HttpHeaders({
      api_token: this.setAPIToken(),
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + this.setAuthToken(),
    });
    return this.http.get(posURL, httpOptions).toPromise();
  }
  fetchPOSListTestData() {
    return this.http.get('./assets/pos.json').toPromise();
  }

  savePurchaseorderLine(paramObj) {
    let purchaseOrderUpdateURL = cons.BASE_URL + '/purchaseorders/' + this.getPONum() + '/updatelineitems';
    httpOptions.headers = new HttpHeaders({
      api_token: this.setAPIToken(),
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + this.setAuthToken(),
    });
    return this.http.put(purchaseOrderUpdateURL, paramObj, httpOptions).toPromise();
  }
}
