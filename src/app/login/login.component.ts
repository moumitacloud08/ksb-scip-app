import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, public appComponent: AppComponent) {}
  imageSrc = 'assets/Image/MaskGroup2.png' 
  imageAlt = 'Token'
  iconSrc = 'assets/Image/Image 14.png' 
  iconAlt = 'KSB'

  isLoggenIn: boolean = false;
  isWrongInput: boolean = false;
  isBlankInput: boolean = false;
  isSent: boolean = false;
  isGenerateTokenPage: boolean = false;
  token: String = '';
 

  authenticate(f: NgForm) {
    this.isWrongInput = false;
    if (f.value.tokenInput != '') {
      this.token = f.value.tokenInput;
      console.log('Input Token: ' + this.token);
      if (this.token == 'abc') {
        this.appComponent.isLoggenIn = true;
        this.isLoggenIn = this.appComponent.isLoggenIn;
        this.isWrongInput = false;
        this.router.navigateByUrl('/purchase-order-line-item');
      } else {
        this.isWrongInput = true;
        this.appComponent.isLoggenIn = false;
        this.isLoggenIn = this.appComponent.isLoggenIn;
        this.isBlankInput = false;
      }
    } else {
      this.isWrongInput = false;
      this.isBlankInput = true;
      this.appComponent.isLoggenIn = false;
      this.isLoggenIn = this.appComponent.isLoggenIn;
    }
  }
  requestNewToken() {
    this.isWrongInput = false;
    this.isBlankInput = false;
    this.appComponent.isLoggenIn = false;
    this.isLoggenIn = this.appComponent.isLoggenIn;
    this.isSent = true;
  }

  ngOnInit(): void {
    this.appComponent.isGenerateTokenPage = false;
    this.isGenerateTokenPage = this.appComponent.isGenerateTokenPage;
  }
}
