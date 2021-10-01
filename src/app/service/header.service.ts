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
  providedIn: 'root'
})
export class HeaderService {

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
  private userEmailURL = cons.BASE_URL + '/users?purchaseOrder='+this.getPONum();
  fetchmailId() {
    httpOptions.headers = new HttpHeaders({
       api_token: this.setAPIToken(),
       'Content-Type': 'application/json',
       Authorization: 'Basic ' + this.setAuthToken(),
     });
   return this.http.get(this.userEmailURL,httpOptions).toPromise();
 }
}
