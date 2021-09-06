import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage'

import { UtilService } from '../util.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoggenIn: boolean = false;
  isWrongInput: boolean = false;
  isBlankInput: boolean = false;
  isSent: boolean = false;
  isGenerateTokenPage: boolean = false;
  token: String = '';

  constructor(
    private LoginService: LoginService,
    private utilService: UtilService,
    private router: Router,
    private localStorageService:LocalStorageService
  ) {}
  authToken;
  ngOnInit(): void {
    this.authToken=this.localStorageService.retrieve('user').authToken
    console.log(" this.authToken In login ")
    console.log(this.authToken)
  }
  response: any;
  message: string = '';
  responseCode: string = '';
  authenticate(f: NgForm) {
    this.isWrongInput = false;

    if (f.value.tokenInput != '') {
      this.token = f.value.tokenInput;
    } else {
      this.token = '';
    }

    console.log('Input Token: ' + this.token);

    this.LoginService.login(this.token).subscribe(
      (response) => {
        this.response = JSON.parse(JSON.stringify(response));
        console.log(this.response);
        this.responseCode = this.response.code;

        if (this.response.code == 200) {
          this.utilService.isLoggenIn = true;
          this.isLoggenIn = this.utilService.isLoggenIn;
          this.isWrongInput = false;
          this.message = this.response.message;
          this.router.navigateByUrl('/dashboard/purchase-order-line-item');
        } else {
          this.message = 'Login Failed';
          this.isWrongInput = true;
          this.utilService.isLoggenIn = false;
          this.isLoggenIn = this.utilService.isLoggenIn;
          this.isBlankInput = false;
        }
      },
      (err) => {}
    );
  }
  requestNewToken() {
    this.isWrongInput = false;
    this.isBlankInput = false;
    this.utilService.isLoggenIn = false;
    this.isLoggenIn = this.utilService.isLoggenIn;
    this.isSent = true;
  }
}
