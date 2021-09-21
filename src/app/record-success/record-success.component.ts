import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record-success',
  templateUrl: './record-success.component.html',
  styleUrls: ['./record-success.component.css']
})
export class RecordSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }
  iconSaved = 'assets/images/save-icon.png';
  iconSavedAlt = 'success';
  goToLogin(){
    this.router.navigateByUrl('/');
  }
}
