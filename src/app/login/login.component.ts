import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {UtilService} from '../util.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggenIn: boolean = false;
  isWrongInput: boolean = false;
  isBlankInput: boolean = false;
  isSent: boolean = false;
  isGenerateTokenPage: boolean = false;
  token: String = '';

  constructor(private utilService: UtilService, private router:Router) { }

  ngOnInit(): void {
  }

  authenticate(f: NgForm) {
    this.isWrongInput = false;
    if (f.value.tokenInput != '') {
      this.token = f.value.tokenInput;
      console.log('Input Token: ' + this.token);
      if (this.token == 'abc') {
        this.utilService.isLoggenIn = true;
        this.isLoggenIn = this.utilService.isLoggenIn;
        this.isWrongInput = false;
        this.router.navigateByUrl('/dashboard/purchase-order-line-item');
      } else {
        this.isWrongInput = true;
        this.utilService.isLoggenIn = false;
        this.isLoggenIn = this.utilService.isLoggenIn;
        this.isBlankInput = false;
      }
    } else {
      this.isWrongInput = false;
      this.isBlankInput = true;
      this.utilService.isLoggenIn = false;
      this.isLoggenIn = this.utilService.isLoggenIn;
    }
  }
  requestNewToken() {
    this.isWrongInput = false;
    this.isBlankInput = false;
    this.utilService.isLoggenIn = false;
    this.isLoggenIn = this.utilService.isLoggenIn;
    this.isSent = true;
  }


}
