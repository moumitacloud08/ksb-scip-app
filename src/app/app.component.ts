import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ksb-scip-app';
  isLoggenIn: boolean = false;

  constructor(private router: Router) {}

  authenticate(f: NgForm) {
    this.isLoggenIn = true;
    if (f.value.tokenInput != '') {
      console.log('Input Token: ' + f.value.tokenInput);
    } else {
      alert('Fill the name first!!!');
    }
    this.router.navigateByUrl('/purchase-order-line-item');
  }
    
}
