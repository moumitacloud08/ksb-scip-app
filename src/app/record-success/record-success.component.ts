import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service'
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import * as cons from '../constants';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
@Component({
  selector: 'app-record-success',
  templateUrl: './record-success.component.html',
  styleUrls: ['./record-success.component.css']
})
export class RecordSuccessComponent implements OnInit {

  constructor(private router: Router, private utilService: UtilService,private localStorageService: LocalStorageService,public translate: TranslateService) {
    translate.addLangs(cons.langArray);
    translate.setDefaultLang(cons.DEFAULT_LANG);
   }
  updatedRecordCount:String;
  lang: string = ''
  appl: string = ''
  key: string = ''
  ngOnInit(): void { 
    console.log(" getUpdatedRecodCount ")
    console.log(this.utilService.updatedRecordCountFunc);
    this.updatedRecordCount = this.utilService.updatedRecordCountFunc

    this.key = this.localStorageService.retrieve("key")
    this.appl = this.localStorageService.retrieve("app")
    this.lang = this.localStorageService.retrieve("lang")
  }
  iconSaved = 'assets/images/save-icon.png';
  iconSavedAlt = 'success';
  goToLogin(){
    this.router.navigateByUrl('/');
    this.routeWithQueryParams()
  }
  routeWithQueryParams() {
    if (this.lang != '' && this.lang != undefined && this.appl != '' && this.appl != undefined && this.key != '' && this.key != undefined) {
      console.log("navigating to vendoer");
      this.router.navigate(['/vendorplatform'], { queryParams: { appl: this.appl, key: this.key, spras: this.lang }, queryParamsHandling: 'merge' });
    }
  }
  dataList: any = []
  head: any = []
  savedData: any = []
  generateDataForPDF() {
    this.savedData = this.localStorageService.retrieve("savedData");
    console.log("=================");
    console.log(this.savedData);
    let dataTemp = []
    let dataList = []
    this.savedData.forEach(function (value) {
      dataTemp = [value.purchaseOrderNumber, value.lineItemNumber, value.scipRelavent, value.scipNumber, value.statisticalGoodsNumber,
      value.casnumber, value.materialCategory]      
      dataList.push(dataTemp);
    });
    console.log(dataList);
    return dataList
  }
  generateHeaderForPDF() {
    let head = []
    let headElements = [
      'Purchase Order',
      'Line Item',
      'SCIP Relevant',
      'SCIP No.',
      'Statistical Goods No',
      'CAS No',
      'Material Category'
    ];
    head = [headElements]
    return head;
  }
  public SaveSCIPDataPDF() {
    // this.generateDataForPDF();
    // this.generateHeaderForPDF();
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('SCIP Information', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({
      head: this.generateHeaderForPDF(),
      body: this.generateDataForPDF(),
      theme: 'plain',
      didDrawCell: data => {
        //console.log(data.column.index)
      }
    })

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // Download PDF document  
    doc.save('table.pdf');
  }
}
