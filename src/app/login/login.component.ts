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
  authenticate(f: NgForm) {
    console.log(f)
    this.isWrongInput = false;

    if (f.value.tokenInput != '') {
      this.apitoken = f.value.tokenInput;
    } else {
      this.apitoken = '';
    }

    console.log('Input Token: ' + this.apitoken);

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
      (err) => {
        console.log("Error caught at Subscriber " + err)
        this.message = err;
      }
    );
  }
  email:string=""
  isSentEmail:boolean = false;
  errorMessage:string=""
  requestNewToken() {
    this.LoginService.generateToken(this.authToken).subscribe(
      (response) => {
        this.response = JSON.parse(JSON.stringify(response));
        console.log(this.response);
        this.responseCode = this.response.code;
        
        if (this.response.code == 200) {
          this.isSentEmail = true
          this.isWrongInput = false;
          this.isSent = true;  
          //this.email = "supplier@gmail.com"
          this.email = this.response.emailAddress
          setTimeout(() => {                           
            this.isSent = false;
          }, 1500);
        } else if(this.response.code == 400) {
          this.isSentEmail = false
          this.errorMessage = this.response.message
        }else {
          this.isSentEmail = false
        }
      },
      (err) => { }
    );

  }
}
