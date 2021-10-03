import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import * as cons from '../constants';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService, private route: ActivatedRoute, public translate: TranslateService) {
    translate.addLangs(cons.langArray);
    translate.setDefaultLang(cons.DEFAULT_LANG);
  }
  lang: string = ''
  appl: string = ''
  key: string = ''
  ngOnInit(): void {
    // this.localStorageService.clear("app")
    // this.localStorageService.clear("key")
    // this.localStorageService.clear("lang")
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
      });


  }
}
