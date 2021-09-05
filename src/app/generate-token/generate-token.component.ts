import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private generatetokenService:GeneratetokenService, private router: Router) { }

  ngOnInit(): void {
  }

  generateToken() {
    // this.router.navigateByUrl('/login');
    this.generatetokenService.generateToken().subscribe(
      (response) => {
        this.response = JSON.parse(JSON.stringify(response));
        console.log(this.response);
        this.responseCode = this.response.code;
        if (this.response.code == 200) {
          this.isGenerated = true;
          this.message = this.response.message;
          this.router.navigateByUrl('/login');
        } else if (this.response.code == 400) {
          this.isGenerated = false;
          this.message = 'Login Failed';
        } else {
          this.isGenerated = false;
          this.message = 'Login Failed';
        }
      },
      (err) => {}
    );
  }

}
