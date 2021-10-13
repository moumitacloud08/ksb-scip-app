import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service'
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import * as cons from '../constants';
@Component({
  selector: 'app-record-success',
  templateUrl: './record-success.component.html',
  styleUrls: ['./record-success.component.css']
})
export class RecordSuccessComponent implements OnInit {

  constructor(private router: Router, private utilService: UtilService,private localStorageService: LocalStorageService,public translate: TranslateService) {
    translate.addLangs(cons.langArray);
    translate.setDefaultLang(cons.DEFAULT_LANG);
   }
  updatedRecordCount:String;
  lang: string = ''
  appl: string = ''
  key: string = ''
  ngOnInit(): void { 
    console.log(" getUpdatedRecodCount ")
    console.log(this.utilService.updatedRecordCountFunc);
    this.updatedRecordCount = this.utilService.updatedRecordCountFunc

    this.key = this.localStorageService.retrieve("key")
    this.appl = this.localStorageService.retrieve("app")
    this.lang = this.localStorageService.retrieve("lang")
  }
  iconSaved = 'assets/images/save-icon.png';
  iconSavedAlt = 'success';
  goToLogin(){
    this.router.navigateByUrl('/');
    this.routeWithQueryParams()
  }
  routeWithQueryParams() {
    console.log(this.router.url);
    console.log(" KEYS ===> "+this.lang + " --- " + this.appl + " -- " + this.key);
    if (this.lang != '' && this.lang != undefined && this.appl != '' && this.appl != undefined && this.key != '' && this.key != undefined) {
      console.log("navigating to vendoer");
      this.router.navigate(['/vendorplatform'], { queryParams: { appl: this.appl, key: this.key, spras: this.lang }, queryParamsHandling: 'merge' });
    }
  }

}
