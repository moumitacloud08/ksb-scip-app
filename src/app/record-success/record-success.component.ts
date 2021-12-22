import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service'
import { LocalStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
import * as cons from '../constants';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { PurchaseOrderLineItemService } from '../service/purchase-order-line-item.service';
import { purchasedetails } from '.././purchasedetail';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-record-success',
  templateUrl: './record-success.component.html',
  styleUrls: ['./record-success.component.css']
})
export class RecordSuccessComponent implements OnInit {

  constructor(private router: Router, private utilService: UtilService, private localStorageService: LocalStorageService, public translate: TranslateService, private purchaseOrderLineItemService: PurchaseOrderLineItemService) {
    translate.addLangs(cons.langArray);
    translate.setDefaultLang(cons.DEFAULT_LANG);
  }
  updatedRecordCount: String;
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

    this.fetchPurchaseDetails();
    //this.fetchPurchaseDetailsTestData()
  }
  response: any;
  results: purchasedetails[];
  fetchPurchaseDetails() {
    this.purchaseOrderLineItemService
      .fetchPurchaseDetails('','')
      .then((data) => {
        console.log(JSON.stringify(data));
        this.response = JSON.parse(JSON.stringify(data));
        this.results = this.response.scipDetails.map((item) => {
          return new purchasedetails(
            item.lineItemNumber,
            item.statisticalGoodsNumber,
            item.purchaseOrderNumber,
            item.scipNumber,
            item.scipRelavent,
            item.materialCategory,
            item.submitStatus,
            item.casnumber,
            item.isAddShow,
            item.isDeleteShow,
            item.isInvalid,
            item.isClearData
          );
        });
        let count = 0;
        this.results.forEach(function (value) {
          value.rowId = count;
          count++;
        })        
      })
      .catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
  }
  fetchPurchaseDetailsTestData() {
    this.purchaseOrderLineItemService
      .fetchPurchaseDetailsTestData('','')
      .then((data) => {
        console.log(JSON.stringify(data));
        this.response = JSON.parse(JSON.stringify(data));
        this.results = this.response.scipDetails.map((item) => {
          return new purchasedetails(
            item.lineItemNumber,
            item.statisticalGoodsNumber,
            item.purchaseOrderNumber,
            item.scipNumber,
            item.scipRelavent,
            item.materialCategory,
            item.submitStatus,
            item.casnumber,
            item.isAddShow,
            item.isDeleteShow,
            item.isInvalid,
            item.isClearData
          );
        });
        let count = 0;
        this.results.forEach(function (value) {
          value.rowId = count;
          count++;
        })
      })
      .catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
  }




  iconSaved = 'assets/images/save-icon.png';
  iconSavedAlt = 'success';
  goToLogin() {
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
    this.savedData = this.results
    console.log("=================");
    console.log(this.savedData);
    let dataTemp = []
    let dataList = []
    this.savedData.forEach(function (value) {
      dataTemp = [value.purchaseOrderNumber, value.lineItemNumber, value.scipRelavent, value.scipNumber, value.statisticalGoodsNumber,
      value.casnumber, value.materialCategory, value.submitStatus]
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
      'Material Category',
      'Status'
    ];
    head = [headElements]
    return head;
  }
  today: number = Date.now();
  pipe = new DatePipe('en-US'); // Use your own locale
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, 'dd MMMM y');
  myFormattedTime = this.pipe.transform(this.now, 'h:mm a');
  public SaveSCIPDataPDF() {
    // this.generateDataForPDF();
    // this.generateHeaderForPDF();
    let height = 0;
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('SCIP Information', 13, 46);
    doc.setFontSize(11);
    doc.setTextColor('#b0b1b3');
    doc.text('SCIP Vendor Platform Application', 13, 33);
    
    doc.setFontSize(8);
    doc.setDrawColor(233, 236, 239);
    doc.line(10, 36, 200, 36);


    (doc as any).autoTable({
      head: this.generateHeaderForPDF(),
      body: this.generateDataForPDF(),
      theme: 'striped',     
      margin: { top: 50 },
      pageBreak: 'auto',
      tableLineColor: [189, 195, 199],
      tableLineWidth: 0.25,
      styles: {
        cellPadding: 3,
        fontSize: 8,
        valign: 'middle',
        overflow: 'linebreak',
        tableWidth: 'auto',
      },
      headerStyles: {
        //columnWidth: 'wrap',
        cellPadding: 3,
        lineWidth: 0,
        valign: 'top',
        fontStyle: 'bold',
        halign: 'left',    //'center' or 'right'
        fillColor: [0.43, 0.22, 0.00, 0.11],
        textColor: [78, 53, 73], //Black     
        //textColor: [255, 255, 255], //White     
        fontSize: 8,
        rowHeight: 9
      },
      didDrawCell: data => {
       // console.log(data.column.index)
      },
      didDrawPage: data => {
      console.log(data.table)
        let tabledata = JSON.parse(JSON.stringify(data.table))
        console.log(tabledata)
        height = (tabledata.body.length + 1) * 9.245555555555555
     },
    })
    console.log("height: "+height)
    doc.setFontSize(8);
    doc.text("Date of submissions:- "+this.myFormattedDate +" | "+this.myFormattedTime, 13, height + 60);
    let imagedata = "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"
    doc.addImage(imagedata, 'JPEG', 13, 8, 20, 20);
    // Open PDF document in new tab

     // The y position on the page

    doc.output('dataurlnewwindow')

    // Download PDF document  
    doc.save('table.pdf');
  }
}
