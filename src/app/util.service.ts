import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  isLogedIn: boolean = false;
  constructor() { }
  
  get isLoggenIn(){
    return this.isLogedIn;
  }
  set isLoggenIn(logedIn){
    this.isLogedIn = logedIn;
  }
}
