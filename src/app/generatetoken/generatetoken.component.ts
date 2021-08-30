import { Component, OnInit } from '@angular/core';
import { AppComponent } from '.././app.component';

@Component({
  selector: 'app-generatetoken',
  templateUrl: './generatetoken.component.html',
  styleUrls: ['./generatetoken.component.css'],
})
export class GeneratetokenComponent implements OnInit {
  constructor(public appComponent: AppComponent) {
    appComponent.isLoggenIn = false;
    appComponent.isGenerateTokenPage = true;
  }
  imageSrc = 'assets/Image/MaskGroup2.png' 
  imageAlt = 'Token'
  iconSrc = 'assets/Image/Image 14.png' 
  iconAlt = 'KSB'
  ngOnInit(): void {}
}
