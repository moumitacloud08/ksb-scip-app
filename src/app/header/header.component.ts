import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { HeaderService } from '../service/header.service';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private headerService: HeaderService
  ) { }
  faSignOutAlt = faSignOutAlt;
  isloggedIn:boolean = false;

  ngOnInit(): void {
    if (this.localStorageService.retrieve("user") != null) {
      this.isloggedIn = true;
      this.fetchmailId();
    }else{
      this.isloggedIn = false;
    }
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
    this.router.navigateByUrl('/');
  }
}
