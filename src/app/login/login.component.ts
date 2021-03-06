import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';


import { LoginService } from '../service/login.service';
import { TranslateService } from '@ngx-translate/core';
import * as cons from '../constants';

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
  apitoken: string = '';

  constructor(
    private LoginService: LoginService,
    private router: Router,
    private localStorageService: LocalStorageService,
    public translate: TranslateService,
    private route: ActivatedRoute
  ) {
    console.log("Inside cons");
    translate.addLangs(cons.langArray);
    translate.setDefaultLang(cons.DEFAULT_LANG);
  }
  // authToken;
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  validateLoginField(event) {
    console.log(event.target.value);
    if (event.target.value == '') {
      this.isWrongInput = false
    }
  }
  lang: string = ''
  appl: string = ''
  key: string = ''
  ngOnInit(): void {
    // this.authToken = this.localStorageService.retrieve('user').authToken;
    // console.log(' this.authToken In login ');
    // console.log(this.authToken);

    this.localStorageService.clear('savedData')
    this.localStorageService.clear('user')
    this.key = this.localStorageService.retrieve("key")
    this.appl = this.localStorageService.retrieve("app")
    this.lang = this.localStorageService.retrieve("lang")

    this.routeWithQueryParams()
  }

  routeWithQueryParams() {
    console.log(this.router.url);
    console.log(" KEYS ===> " + this.lang + " --- " + this.appl + " -- " + this.key);
    if (this.lang != '' && this.lang != undefined && this.appl != '' && this.appl != undefined && this.key != '' && this.key != undefined) {
      console.log("navigating to vendoer");
      this.router.navigate(['/vendorplatform'], { queryParams: { appl: this.appl, key: this.key, spras: this.lang }, queryParamsHandling: 'merge' });
    }
  }

  userName: String = 'ksb';
  password: String = 'ksb';

  str1 = new String(this.userName);
  str2 = new String(":" + this.password);
  authToken: string = btoa(this.str1.concat(this.str2.toString()))
  authObject = {
    authToken: this.authToken,
    'valid': false
  }
  response: any;
  message: string = '';
  responseCode: string = '';
  messages: any[] = [];

  iconSaved = 'assets/images/save-icon.png';
  iconSavedAlt = 'success';
  iconFailed = 'assets/images/warning-icon.png';
  iconFaileddAlt = 'success';
  isTokenblank: boolean = false
  authenticate(f: NgForm) {
    console.log(f)
    this.isWrongInput = false;
    this.isSent = false
    if (f.value.tokenInput != '') {
      this.apitoken = f.value.tokenInput;
    } else {
      this.apitoken = '';
    }

    console.log('Input Token: ' + this.apitoken);
    if (this.apitoken != '') {
      this.isTokenblank = false
      this.LoginService.login(this.apitoken, this.authToken).subscribe(
        (response) => {

          this.response = JSON.parse(JSON.stringify(response));
          console.log(this.response);
          this.responseCode = this.response.code;

          //FOR UNIT TESTING
          this.messages = this.response

          if (this.response.code == 200) {


            this.isWrongInput = false;
            this.message = this.response.message;

            this.localStorageService.store('user', this.authObject)
            this.authObject.valid = true;


            this.localStorageService.store('api_token', this.apitoken)
            this.router.navigateByUrl('/dashboard/purchase-order-line-item');
          } if (this.response.code == 406) {

            let remAttempt = 3 - this.response.loginAttemted

            this.message = "Wrong token!" + remAttempt + " attempt remaining and it will block after";
            this.isWrongInput = true;
            this.isBlankInput = false;

          } if (this.response.code == 404) {

            this.message = "Request is Blocked! till date:" + this.response.blockedUntilDateTime.split('-')[0]+
            ' and time: '+this.response.blockedUntilDateTime.split('-')[1];
            this.isWrongInput = true;
            this.isBlankInput = false;

          }else if (this.response.code == 410) {

            this.message = this.response.message;
            this.isWrongInput = true;
            this.isBlankInput = false;

          } else {

            this.message = 'Login Failed';
            this.isWrongInput = true;
            this.isBlankInput = false;
          }
        },
        (err) => {
          console.log("Error caught at Subscriber " + err)
          this.message = err;
        }
      );
    } else {
      this.isTokenblank = true
    }

  }
  email: string = ""
  isSentEmail: boolean = false;
  errorMessage: string = ""
  successMessage: string = ""
  newTokenAttempt: number
  requestNewToken() {
    this.LoginService.generateToken(this.authToken).subscribe(
      (response) => {
        this.response = JSON.parse(JSON.stringify(response));
        console.log(this.response);
        this.responseCode = this.response.code;

        //FOR UNIT TESTING
        this.messages = this.response
        let remAttempt;
        if (this.response.code == 200) {
          this.isSentEmail = true
          this.isWrongInput = false;
          this.isSent = true;
          this.isTokenblank = false
          //this.email = "supplier@gmail.com"
          this.email = this.response.emailAddress
          this.successMessage = this.response.message

          remAttempt = 3 - this.response.loginAttemted
          this.newTokenAttempt = remAttempt
          setTimeout(() => {
            this.isSent = false;
          }, 1500);
        } else if (this.response.code == 400) {
          this.isSentEmail = false
          this.errorMessage = this.response.message          
        }else if (this.response.code == 404) {
          this.isSentEmail = false
          this.errorMessage =  "Request is Blocked! till date:" + this.response.blockedUntilDateTime.split('-')[0]+
          ' and time: '+this.response.blockedUntilDateTime.split('-')[1];      
        }  else {
          this.isSentEmail = false
          this.errorMessage = this.response.message
        }
      },
      (err) => { }
    );

  }
}
