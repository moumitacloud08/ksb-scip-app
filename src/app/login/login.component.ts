import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { UtilService } from '../util.service';
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
    private utilService: UtilService,
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

    // this.localStorageService.clear("app")
    // this.localStorageService.clear("key")
    // this.localStorageService.clear("lang")

    this.localStorageService.clear('user')
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.appl = params.appl;
        this.key = params.key;
        this.lang = params.spras;
        console.log("lang : " + this.lang);

        if (this.lang == '' || this.lang == undefined) {
          this.translate.use(cons.DEFAULT_LANG);
          this.lang = cons.DEFAULT_LANG
        } else {
          this.translate.use(this.lang);
        }
        if (this.appl == '' || this.appl == undefined) {
          this.appl = ''
        }
        if (this.key == '' || this.key == undefined) {
          this.key = ''
        }

        this.localStorageService.store("app", this.appl)
        this.localStorageService.store("key", this.key)
        this.localStorageService.store("lang", this.lang)
      }
      );

    this.routeWithQueryParams()
  }

  routeWithQueryParams() {
    console.log(this.router.url);
    console.log(this.lang + " --- " + this.appl + " -- " + this.key);
    if (this.lang != '' && this.lang != undefined && this.appl != '' && this.appl != undefined && this.key != '' && this.key != undefined) {
      console.log("navigating to vendoer");
      this.router.navigate(['/vendorplatform'], { queryParams: { appl: this.appl, key: this.key, spras: this.lang }, queryParamsHandling: 'merge' });
    }
    //   this.router.navigate(['/vendorplatform'], { queryParams: { appl: 'scip' }});
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
      (err) => { }
    );
  }
  requestNewToken() {
    this.isWrongInput = false;
    this.isBlankInput = false;
    this.isSent = true;
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.isSent = false;
    }, 1500);
  }
}
