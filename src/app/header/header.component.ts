import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage'

import {
 faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private localStorageService: LocalStorageService) { }
  faSignOutAlt = faSignOutAlt;

  ngOnInit(): void {
  }

  logout() {
    this.localStorageService.clear('user')
    this.localStorageService.clear('api_token')
    this.router.navigateByUrl('/');
  }
}
