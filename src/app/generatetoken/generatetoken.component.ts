import { Component, OnInit } from '@angular/core';
import { AppComponent } from '.././app.component';
import {GeneratetokenService } from '.././generatetoken.service'
import { Message } from '.././message';

@Component({
  selector: 'app-generatetoken',
  templateUrl: './generatetoken.component.html',
  styleUrls: ['./generatetoken.component.css'],
})
export class GeneratetokenComponent implements OnInit {
  constructor(public appComponent: AppComponent, private generatetokenService: GeneratetokenService) {
    appComponent.isLoggenIn = false;
    appComponent.isGenerateTokenPage = true;
  }
  imageSrc = 'assets/Image/MaskGroup2.png' 
  imageAlt = 'Token'
  iconSrc = 'assets/Image/Image 14.png' 
  iconAlt = 'KSB'
  messages: Message[] = [];
  generateToken() {
    this.generatetokenService.generateToken()
    .subscribe();
  }
  ngOnInit(): void {}
}
