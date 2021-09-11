import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage'

import {GeneratetokenService} from '../service/generatetoken.service';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.css']
})
export class GenerateTokenComponent implements OnInit {

  isGenerated: boolean = false;
  response: any;
  message: string = '';
  responseCode: string='';
  constructor(private generatetokenService:GeneratetokenService, private router: Router,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.clear('user')
  }
  userName: String ='ksb';
  password: String ='ksb';

  str1 = new String(this.userName); 
  str2 = new String( ":"+this.password ); 
  authToken:String = btoa(this.str1.concat(this.str2.toString()))
  authObject = {
    authToken:this.authToken,
    'valid':false
  }

  generateToken() {
    
    this.generatetokenService.generateToken(this.authToken).subscribe(
      (response) => {
        this.response = JSON.parse(JSON.stringify(response));
        console.log(this.response);
        this.responseCode = this.response.code;
        if (this.response.code == 200) {
          this.isGenerated = true;
          this.message = this.response.message;
          this.localStorageService.store('user',this.authObject)
          this.authObject.valid = true;
          this.router.navigateByUrl('/login');
        }  else {
          this.isGenerated = false;
          this.authObject.valid = false;
          this.message = 'Token Generate Failed';
        }
      },
      (err) => {}
    );
  }

}
