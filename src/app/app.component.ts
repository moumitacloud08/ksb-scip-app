import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { faSignOutAlt,faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ksb-scip-app';
  isLoggenIn: boolean = false;
  isGenerateTokenPage: boolean = false;
  iconSrc = 'assets/Image/Image 14.png' 
  iconAlt = 'KSB'
  faSignOutAlt = faSignOutAlt;
  faUser=faUser;
  
  usericon = 'assets/Image/usericon.png' 
  userAlt = 'John'
 

  constructor(private router: Router) {}


  
  logout() {
    this.isLoggenIn = false;
    this.router.navigateByUrl('/');
  }
}
