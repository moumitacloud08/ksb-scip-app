import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { UtilService } from '../util.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isWrongInput: boolean = false;
  isBlankInput: boolean = false;
  isSent: boolean = false;
  isGenerateTokenPage: boolean = false;
  token: string = '';

  constructor(
    private LoginService: LoginService,
    private utilService: UtilService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  authToken;
  ngOnInit(): void {
    this.authToken = this.localStorageService.retrieve('user').authToken;
    console.log(' this.authToken In login ');
    console.log(this.authToken);
  }
  response: any;
  message: string = '';
  responseCode: string = '';
  messages: any[] = [];

  iconSaved = 'assets/images/save-icon.png';
  iconSavedAlt = 'success';
  iconFailed = 'assets/images/warning-icon.png';
  iconFaileddAlt = 'success';
  authenticate(f: NgForm) {
    console.log(f)
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

        //FOR UNIT TESTING
        this.messages=this.response

        if (this.response.code == 200) {
          
         
          this.isWrongInput = false;
          this.message = this.response.message;
          this.localStorageService.store('api_token',this.token)
          this.router.navigateByUrl('/dashboard/purchase-order-line-item');
        } else {
          //this.message = this.response.message;
          this.message = "Wrong token! 2 attempt remaining and it will block after";
          if (this.message == '') {
            this.message = 'Login Failed';
          }

          this.isWrongInput = true;
          this.isBlankInput = false;
        }
      },
      (err) => {}
    );
  }
  requestNewToken() {
    this.isWrongInput = false;
    this.isBlankInput = false;
    this.isSent = true;
  }
}
