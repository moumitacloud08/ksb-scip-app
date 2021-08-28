import { Component, OnInit } from '@angular/core';
import { AppComponent } from '.././app.component';

@Component({
  selector: 'app-generatetoken',
  templateUrl: './generatetoken.component.html',
  styleUrls: ['./generatetoken.component.css'],
})
export class GeneratetokenComponent implements OnInit {
  constructor(public appComponent: AppComponent) {
    appComponent.isLoggenIn = true;
  }

  ngOnInit(): void {}
}
