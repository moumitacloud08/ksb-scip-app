import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import * as cons from '../constants';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService, private route: ActivatedRoute, public translate: TranslateService,private router: Router) {
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
    this.getURLParams()
  }

  getURLParams() {
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

  switchLang(lang: string) {
    this.lang = lang
    this.translate.use(this.lang);
    this.localStorageService.store("lang", this.lang)
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
