import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../message.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as cons from '../constants';

const httpOptions = {
  headers: new HttpHeaders({}),
};

@Injectable({
  providedIn: 'root',
})
export class GeneratetokenService {
  constructor(
    private http: HttpClient
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
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  private tokenUrl =
    cons.BASE_URL + '/login/requestNewToken?purchaseOrder=12345'; // URL to web api

  generateToken(authToken: String): Observable<Message[]> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + authToken,
    });
    console.log(httpOptions);
    return this.http
      .get<Message[]>(this.tokenUrl, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
