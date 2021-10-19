import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../message.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
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
export class LoginService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }
  errorMessage: string;
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.errorMessage = error.message;
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
  getPONum() {
    let key = this.localStorageService.retrieve("key")
    return key;
  }
  // URL to web api



  login(apitoken: string, authToken: string): Observable<any[]> {
    let tokenUrl =
      cons.BASE_URL + '/login/authenticateVendor?purchaseOrder=' + this.getPONum();
    console.log('Input Token in Service: ' + apitoken);

    if (apitoken != '' && authToken != ' ') {
      console.log('token not blank ');
      httpOptions.headers = new HttpHeaders({
        api_token: apitoken,
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + authToken,
      });
    }
    console.log('tokenUrl ' + tokenUrl);
    return this.http.get<any[]>(tokenUrl, httpOptions).pipe(
      tap((data) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // URL to web api

  generateToken(authToken: String): Observable<any[]> {
    console.log(authToken);
    let tokenUrl =
      cons.BASE_URL + '/login/requestNewToken?purchaseOrder=' + this.getPONum();
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + authToken,
    });
    console.log(httpOptions);
    return this.http
      .get<any[]>(tokenUrl, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
