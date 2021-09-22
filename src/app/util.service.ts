import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isLogedIn: boolean = false;
  updatedRecordCount: String = '';
  constructor() { }
  
  get isLoggenIn(){
    return this.isLogedIn;
  }
  set isLoggenIn(logedIn){
    this.isLogedIn = logedIn;
  }
  get updatedRecordCountFunc(){
    return this.updatedRecordCount;
  }
  set updatedRecordCountFunc(updatedRecordCount){
    this.updatedRecordCount = updatedRecordCount;
  }
}
