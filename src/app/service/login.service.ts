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
  ) {}

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
  private tokenUrl =
    cons.BASE_URL + '/login/authenticateVendor?purchaseOrder=12345'; // URL to web api

  login(token: string): Observable<any[]> {
    console.log('Input Token in Service: ' + token);

    if (token != '') {
      console.log('token not blank ');
      httpOptions.headers = new HttpHeaders({
        api_token: token,
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + this.localStorageService.retrieve('user').authToken,
      });
    }
    console.log('tokenUrl ' + this.tokenUrl);
    return this.http.get<any[]>(this.tokenUrl, httpOptions).pipe(
      tap((data) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
}
