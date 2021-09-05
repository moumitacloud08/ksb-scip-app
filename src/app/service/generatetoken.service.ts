import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../message.model';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import * as cons from '../constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('ksb:ksb')
  })
};


@Injectable({
  providedIn: 'root',
})
export class GeneratetokenService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TokenService: ${message}`);
  }
   of: any;

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return this.of(result as T);
    };
  }
  private tokenUrl = cons.BASE_URL+'/login/requestNewToken?purchaseOrder=12345';  // URL to web api

  generateToken(): Observable<Message[]> {
    return this.http.get<Message[]>(this.tokenUrl,httpOptions);
  }


  
}
