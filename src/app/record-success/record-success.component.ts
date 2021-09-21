import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-success',
  templateUrl: './record-success.component.html',
  styleUrls: ['./record-success.component.css']
})
export class RecordSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  iconSaved = 'assets/images/save-icon.png';
  iconSavedAlt = 'success';
}
