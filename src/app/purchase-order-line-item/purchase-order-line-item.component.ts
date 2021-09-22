import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  faPlus,
  faGreaterThan,
  faLessThan,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';
import { PurchaseOrderLineItemService } from '../service/purchase-order-line-item.service';
import { purchasedetails } from '.././purchasedetail';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { Router } from '@angular/router';
import duplicates from 'find-array-duplicates'

@Component({
  selector: 'app-purchase-order-line-item',
  templateUrl: './purchase-order-line-item.component.html',
  styleUrls: ['./purchase-order-line-item.component.css'],
})
export class PurchaseOrderLineItemComponent implements OnInit {
  faPlus = faPlus;
  faLessThan = faLessThan;
  faGreaterThan = faGreaterThan;
  faFilePdf = faFilePdf;
  isCatergoryList: Boolean = true;
  selectedCat: string = '';
  iconPlusCircle = 'assets/images/plus-circle.png';
  iconPlusAlt = 'add';
  iconDelete = 'assets/images/delete-icon.png';
  iconDeleteAlt = 'delete';
  iconPDF = 'assets/images/pdficon2.png';
  iconPDFAlt = 'pdf';
  iconArrow = 'assets/images/arrowicon.png';
  iconArrowAlt = 'select';
  iconSaved = 'assets/images/save-icon.png';
  iconSavedAlt = 'success';
  iconClearData = 'assets/images/clear-icon.png';
  iconClearDatadAlt = 'clear data';
  crossiconWarning = 'assets/images/warning-cross-icon.png';
  crossiconWarningdAlt = 'warning';  
  iconWarning = 'assets/images/warning-icon.png';
  iconWarningdAlt = 'warning';
  iconCross = 'assets/images/cross.png';
  iiconCrossAlt = 'cross';
  results: purchasedetails[];
  activeParentIndex: number;
  constructor(
    private localStorageService: LocalStorageService,
    private purchaseOrderLineItemService: PurchaseOrderLineItemService,
    private router: Router,
  ) {
    this.results = [];
  }
  authToken;
  isPurchaseOrderSaved: boolean = false;
  responseCode: String = '';
  headElements: any = [];
  searchedKeyword: string;
  ngOnInit(): void {
    this.authToken = this.localStorageService.retrieve('user').authToken;
    console.log(' this.authToken In login ');
    console.log(this.authToken);

    this.headElements = [
      'Purchase Order',
      'Line Item',
      'SCIP Relevant',
      'SCIP No.',
      'Statistical Goods No',
      'CAS No',
      'Material Category',
      'Add row',
      'Clear data'
    ];

    this.fetchPurchaseDetails();
  }
  getSCIPRel(parentIndex,scipRel){
    // console.log()
    this.results[parentIndex].scipRelavent=scipRel
  }
  clearSCIPData(parentIndex){
    this.results[parentIndex].scipNumber=''
  }
  clearStatisticalData(parentIndex){
    this.results[parentIndex].statisticalGoodsNumber=''
  }
  clearCasNum(parentIndex){
    this.results[parentIndex].casnumber=''
  }
  clearMatCat(parentIndex){
    this.results[parentIndex].materialCategory=''
  }
  mouseEnter(parentIndex) {
    if (this.activeParentIndex !== parentIndex) {
      this.activeParentIndex = parentIndex;
      this.resetAllRow();
      this.results[parentIndex].isAddShow = false;
      this.results[parentIndex].isDeleteShow = true;
    }
  }
  mouseLeave(parentIndex) {
    this.activeParentIndex = null;
    this.resetAllRow();
    // this.results[parentIndex].isAddShow = true;
    // this.results[parentIndex].isDeleteShow = false;
  }
  clickevent(parentIndex) {
    if (this.activeParentIndex !== parentIndex) {
      this.activeParentIndex = parentIndex;
      this.resetAllRow();
      this.results[parentIndex].isAddShow = false;
      this.results[parentIndex].isDeleteShow = true;
    }
  }
  resetAllRow(): void {
    this.results = this.results.map(res => {
      return { ...res, isAddShow: true, isDeleteShow: false }
    });
  }
  myVar: boolean = false
  clearRowData(parentIndex) {
    this.results[parentIndex].scipNumber = '';
    this.results[parentIndex].statisticalGoodsNumber = '';
    this.results[parentIndex].casnumber = '';
    this.results[parentIndex].materialCategory = '';
    // this.resetAllRow();
  }
  response: any;
  resultsTemp: purchasedetails[];
  fetchPurchaseDetails() {
    this.purchaseOrderLineItemService
      .fetchPurchaseDetails()
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
        this.resultsTemp = this.results
        //console.log(' <===this.results====>');
        //console.log(JSON.parse(JSON.stringify(this.resultsTemp)));
        this.resultsTemp = JSON.parse(JSON.stringify(this.resultsTemp));
      })
      .catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
  }
  validateScip(event: any, scipNumber: string, parentIndex: number) {
    this.results[parentIndex].scipNumber =
      this.results[parentIndex].scipNumber.replace(/\D/g, '')
    if (this.results[parentIndex].scipNumber.length < 10) {
      this.results[parentIndex].isInvalid = true;
    } else {
      this.results[parentIndex].isInvalid = false;
    }
  }

  selectMaterial(item: any, parentIndex: any, elements: any) {
    this.isCatergoryList = true;
    this.selectedCat = item;
    this.isCatergoryList = !this.isCatergoryList;

    if (item != '' && item != 'materialCategory') {
      elements[parentIndex].isSelected = true;
      elements[parentIndex].selectedCat = item;
    }
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }
  errorMessage: string = '';
  savePurchaseorderLine() {
    console.log(this.resultsTemp);
    console.log(this.results);
    let dataList = []
    let resultTemp = this.resultsTemp;
    this.results.forEach(function (valueNew) {
      resultTemp.forEach(function (valueOld) {
        if (valueNew.rowId == valueOld.rowId) {
          if (valueNew.scipNumber != valueOld.scipNumber || valueNew.statisticalGoodsNumber != valueOld.statisticalGoodsNumber || 
            valueNew.casnumber != valueOld.casnumber || valueNew.materialCategory != valueOld.materialCategory || valueNew.scipRelavent != valueOld.scipRelavent) {
            dataList.push(valueNew);
          }
        }

      });
    });

    console.log(dataList);

    let uniqueDataList = this.removeDuplicates(dataList, "rowId");
    console.log(uniqueDataList)
    let dataListFinal = []
    uniqueDataList.forEach(function (value) {
      dataListFinal.push({
        "casnumber": value.casnumber,
        "lineItemNumber": value.lineItemNumber,
        "materialCategory": value.materialCategory,
        "purchaseOrderNumber": value.purchaseOrderNumber,
        "scipNumber": value.scipNumber,
        "scipRelavent": value.scipRelavent,
        "statisticalGoodsNumber": value.statisticalGoodsNumber,
        "submitStatus": value.submitStatus

      });
    });
    let params = { "scipDetails": dataListFinal }

    console.log("<=========params==============>")
    console.log(JSON.stringify(params));
    console.log(params)

    this.purchaseOrderLineItemService
      .savePurchaseorderLine(params)
      .then((data) => {
        console.log(JSON.stringify(data));
        this.response = JSON.parse(JSON.stringify(data));
        this.responseCode = this.response.code;
        //this.responseCode = '200';
        if (this.responseCode == '200') {
          this.localStorageService.clear('user');
          this.localStorageService.clear('api_token');
          this.isPurchaseOrderSaved = true;
          this.router.navigateByUrl('/record-success');
        } else {
          this.isPurchaseOrderSaved = false;
          this.errorMessage = 'Something went wrong . Please try after something';
        }
      }).catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });


  }

  editPurchaseorderLine(parentIndex) {
    // this.results[parentIndex].isAddShow = false;
    // this.results[parentIndex].isDeleteShow = true;
  }

  ClearAllTableData() {
    this.results.forEach(function (value) {
      console.log(value);
      value.scipNumber = ''
      value.casnumber = ''
      value.statisticalGoodsNumber = ''
      value.materialCategory = ''
    });
  }
  resetPurchaseorderLine() {
    this.fetchPurchaseDetails();
    this.headElements = [
      'Purchase Order',
      'Line Item',
      'SCIP Relevant',
      'SCIP No.',
      'Statistical Goods No',
      'CAS No',
      'Material Category',
      'Action',
      'Clear data'
    ];
  }

  dataList: any = []
  head: any = []
  generateDataForPDF() {
    let dataTemp = []
    let dataList = []
    this.results.forEach(function (value) {
      //console.log(value);
      dataTemp = [value.purchaseOrderNumber, value.lineItemNumber, value.scipRelavent, value.scipNumber, value.statisticalGoodsNumber,
      value.casnumber, value.materialCategory]
      // dataTemp.push(value.purchaseOrderNumber,value.lineItemNumber,value.scipRelavent, value.scipNumber,value.statisticalGoodsNumber,
      //   value.casnumber,value.materialCategory);

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
  public SavePDF() {
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
