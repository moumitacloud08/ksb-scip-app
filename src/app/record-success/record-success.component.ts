import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service'

@Component({
  selector: 'app-record-success',
  templateUrl: './record-success.component.html',
  styleUrls: ['./record-success.component.css']
})
export class RecordSuccessComponent implements OnInit {

  constructor(private router: Router, private utilService: UtilService) { }
  updatedRecordCount:String;
  ngOnInit(): void { 
    console.log(" getUpdatedRecodCount ")
    console.log(this.utilService.updatedRecordCountFunc);
    this.updatedRecordCount = this.utilService.updatedRecordCountFunc
  }
  iconSaved = 'assets/images/save-icon.png';
  iconSavedAlt = 'success';
  goToLogin(){
    this.router.navigateByUrl('/');
  }
}
