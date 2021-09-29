import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { HeaderService } from '../service/header.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import * as cons from '../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private headerService: HeaderService,
    public translate: TranslateService,
  ) {
    translate.addLangs(cons.langArray);
    translate.setDefaultLang(cons.DEFAULT_LANG);
   }
  faSignOutAlt = faSignOutAlt;
  isloggedIn:boolean = false;

  lang:string = ''
  appl:string = ''
  key:string = ''
  ngOnInit(): void {
    if (this.localStorageService.retrieve("user") != null) {
      this.isloggedIn = true;
      this.fetchmailId();
    }else{
      this.isloggedIn = false;
    }
    this.appl = this.localStorageService.retrieve("app")
    this.key = this.localStorageService.retrieve("key")
    this.lang = this.localStorageService.retrieve("lang")
    this.translate.use(this.lang);
  }
  response: any;
  emailId: String;
  fetchmailId() {
    this.headerService
      .fetchmailId()
      .then((data) => {
        this.response = JSON.parse(JSON.stringify(data));
        this.emailId = this.response.vendor.email;
        console.log("this.emailId : " + this.emailId)
      })
      .catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
  }
  logout() {
    this.localStorageService.clear('user');
    this.localStorageService.clear('api_token');
   
    if(this.lang != '' && this.lang != undefined && this.appl != '' && this.appl != undefined && this.key != ''  && this.key != undefined){
      console.log("navigating to vendoer");
      this.router.navigate(['/vendorplatform'], { queryParams: { appl: this.appl,key:this.key,spras:this.lang },queryParamsHandling: 'merge' });
    }else{
      this.router.navigateByUrl('/');
    }
  }
}
