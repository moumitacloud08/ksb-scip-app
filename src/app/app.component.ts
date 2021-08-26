import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ksb-scip-app';
  isLoggenIn:boolean = false;
  constructor(private router: Router) { }

  authenticate(){
    this.isLoggenIn=true;
    this.router.navigateByUrl('/purchase-order-line-item.component');
  }
}
