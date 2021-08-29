import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ksb-scip-app';
  isLoggenIn: boolean = false;
  isWrongInput: boolean = false;
  isBlankInput: boolean = false;
  isSent: boolean = false;
  token: String = '';
  faSignOutAlt = faSignOutAlt;

  constructor(private router: Router) {}
  iconSrc = 'assets/Image/Image 14.png' 
  iconAlt = 'KSB'

  authenticate(f: NgForm) {
    this.isWrongInput = false;
    if (f.value.tokenInput != '') {
      this.token = f.value.tokenInput;
      console.log('Input Token: ' + this.token);
      if (this.token == 'abc') {
        this.isLoggenIn = true;
        this.isWrongInput = false;
        this.router.navigateByUrl('/purchase-order-line-item');
      }else{
        this.isWrongInput = true;
        this.isLoggenIn = false;
        this.isBlankInput = false;
      }
    } else {
      this.isWrongInput = false;
      this.isBlankInput = true;
      this.isLoggenIn = false;
    }
  }
  requestNewToken() {
    this.isWrongInput = false;
    this.isBlankInput = false;
    this.isLoggenIn = false;
    this.isSent = true;
  }
  logout() {
    this.isWrongInput = false;
    this.isBlankInput = false;
    this.isLoggenIn = false;
    this.isSent = false;
    this.router.navigateByUrl('/');
  }
}
