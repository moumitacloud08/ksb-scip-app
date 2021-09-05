import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UtilService } from '../util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router, private utilService: UtilService) { }

  ngOnInit(): void {
  }

  logout() {
    this.utilService.isLoggenIn = false;
    this.router.navigateByUrl('/');
  }
}
