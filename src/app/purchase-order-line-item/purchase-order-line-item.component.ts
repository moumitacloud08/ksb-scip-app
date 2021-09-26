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
import { UtilService } from '../util.service'

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
  iconCopy = 'assets/images/copy-icon.png';
  iconCopyAlt = 'copy';
  results: purchasedetails[];
  activeParentIndex: number;
  constructor(
    private localStorageService: LocalStorageService,
    private purchaseOrderLineItemService: PurchaseOrderLineItemService,
    private router: Router,
    private utilService: UtilService
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

    //this.fetchPurchaseDetails();
    this.fetchPurchaseDetailsTestData()
  }
  getSCIPRel(parentIndex, scipRel) {
    // console.log()
    this.results[parentIndex].scipRelavent = scipRel
  }
  clearSCIPData(parentIndex) {
    this.results[parentIndex].scipNumber = ''
  }
  clearStatisticalData(parentIndex) {
    this.results[parentIndex].statisticalGoodsNumber = ''
  }
  clearCasNum(parentIndex) {
    this.results[parentIndex].casnumber = ''
  }
  clearMatCat(parentIndex) {
    this.results[parentIndex].materialCategory = ''
  }
  mouseEnter(parentIndex, field) {
    if (this.activeParentIndex !== parentIndex) {
      this.activeParentIndex = parentIndex;
      this.resetAllRow();
      this.results[parentIndex].isAddShow = false;
      this.results[parentIndex].isDeleteShow = true;
      if (field == 'scip') {
        this.results[parentIndex].isSCIPSpanShow = false;
        this.results[parentIndex].isSCIPEditShow = true;


        this.results[parentIndex].isStatSpanShow = true;
        this.results[parentIndex].isStatEditShow = false;

        this.results[parentIndex].isCasSpanShow = true;
        this.results[parentIndex].isCasEditShow = false;

        this.results[parentIndex].isMatSpanShow = true;
        this.results[parentIndex].isMatEditShow = false;
      } else if (field == 'stat') {
        this.results[parentIndex].isStatSpanShow = false;
        this.results[parentIndex].isStatEditShow = true;


        this.results[parentIndex].isSCIPSpanShow = true;
        this.results[parentIndex].isSCIPEditShow = false;

        this.results[parentIndex].isCasSpanShow = true;
        this.results[parentIndex].isCasEditShow = false;

        this.results[parentIndex].isMatSpanShow = true;
        this.results[parentIndex].isMatEditShow = false;
      } else if (field == 'cas') {
        this.results[parentIndex].isCasSpanShow = false;
        this.results[parentIndex].isCasEditShow = true;


        this.results[parentIndex].isSCIPSpanShow = true;
        this.results[parentIndex].isSCIPEditShow = false;

        this.results[parentIndex].isStatSpanShow = true;
        this.results[parentIndex].isStatEditShow = false;

        this.results[parentIndex].isMatSpanShow = true;
        this.results[parentIndex].isMatEditShow = false;
      } else if (field == 'mat') {
        this.results[parentIndex].isMatSpanShow = false;
        this.results[parentIndex].isMatEditShow = true;


        this.results[parentIndex].isSCIPSpanShow = true;
        this.results[parentIndex].isSCIPEditShow = false;

        this.results[parentIndex].isStatSpanShow = true;
        this.results[parentIndex].isStatEditShow = false;

        this.results[parentIndex].isCasSpanShow = true;
        this.results[parentIndex].isCasEditShow = false;
      } else {
        this.results[parentIndex].isSCIPSpanShow = true;
        this.results[parentIndex].isSCIPEditShow = false;

        this.results[parentIndex].isStatSpanShow = true;
        this.results[parentIndex].isStatEditShow = false;

        this.results[parentIndex].isCasSpanShow = true;
        this.results[parentIndex].isCasEditShow = false;

        this.results[parentIndex].isMatSpanShow = true;
        this.results[parentIndex].isMatEditShow = false;
      }

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
      this.results[parentIndex].isSCIPSpanShow = false;
      this.results[parentIndex].isSCIPEditShow = true;
    }
  }
  resetAllRow(): void {
    this.results = this.results.map(res => {
      return { ...res, isAddShow: true, isDeleteShow: false, isSCIPSpanShow: true, isSCIPEditShow: false, isStatSpanShow: true, isStatEditShow: false, isCasSpanShow: true, isCasEditShow: false, isMatSpanShow: true, isMatEditShow: false }
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
        // this.resultsTemp = this.results
        this.resultsTemp = Object.assign([], this.results);
        //console.log(' <===this.results====>');
        //console.log(JSON.parse(JSON.stringify(this.resultsTemp)));
        this.resultsTemp = JSON.parse(JSON.stringify(this.resultsTemp));
      })
      .catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
  }
  fetchPurchaseDetailsTestData() {
    this.purchaseOrderLineItemService
      .fetchPurchaseDetailsTestData()
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
        this.resultsTemp = Object.assign([], this.results);
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
      this.results[parentIndex].scipNumber.replace(/[^0-9a-z]/gi, '')
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
  updatedRecordCount: Number;
  savePurchaseorderLine() {
    console.log(this.resultsTemp);
    console.log(this.results);
    let dataList = []
    let resultTemp = Object.assign([], this.resultsTemp);
    this.results.forEach(function (valueNew) {
      resultTemp.forEach(function (valueOld) {
        if (!valueOld.isSubRow && valueNew.rowId == valueOld.rowId) {
          if (valueNew.scipNumber != valueOld.scipNumber || valueNew.statisticalGoodsNumber != valueOld.statisticalGoodsNumber ||
            valueNew.casnumber != valueOld.casnumber || valueNew.materialCategory != valueOld.materialCategory || valueNew.scipRelavent != valueOld.scipRelavent) {
            dataList.push(valueNew);
          }
        }

      });
    });

    //console.log(dataList);

    let uniqueDataList = this.removeDuplicates(dataList, "rowId");
    //console.log(uniqueDataList)
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
          this.utilService.updatedRecordCountFunc = dataListFinal.length.toString();
          this.router.navigateByUrl('/record-success');
        } else {
          this.isPurchaseOrderSaved = false;
          this.errorMessage = 'Something went wrong . Please try after something';
        }
      }).catch((error) => {
        this.isPurchaseOrderSaved = false;
        this.errorMessage = 'Something went wrong . Please try after something';
        console.log('Promise rejected with ' + JSON.stringify(error));
      });


  }
  isRowDuplicated: boolean = false;
  editPurchaseorderLine(parentIndex: number, rowId: number) {
    // this.results[parentIndex].isAddShow = false;
    // this.results[parentIndex].isDeleteShow = true;
    console.log(parentIndex + " --- " + rowId);
    let resultTemp = Object.assign([], this.results);
    if (resultTemp[parentIndex + 1] === undefined || !resultTemp[parentIndex + 1].isSubRow) {
      let objTemp: purchasedetails = {
        lineItemNumber: "",
        statisticalGoodsNumber: "",
        purchaseOrderNumber: "",
        scipNumber: "",
        scipRelavent: "",
        materialCategory: "",
        submitStatus: "",
        casnumber: "",
        isAddShow: true,
        isDeleteShow: false,
        isInvalid: false,
        isClearData: true,
        rowId: this.results.length,
        isSubRow: false,
        isSCIPSpanShow: true,
        isSCIPEditShow: false,
        isStatSpanShow: true,
        isStatEditShow: false,
        isCasSpanShow: true,
        isCasEditShow: false,
        isMatSpanShow: true,
        isMatEditShow: false
      }

      resultTemp.push(objTemp);

      let nextIndex: number = parentIndex + 1
      let nexttonextIndex: number = parentIndex + 2
      let lastIndex = resultTemp.length - 1
      if (nextIndex != lastIndex) {

        let nextIndexObj: purchasedetails = {
          lineItemNumber: resultTemp[nextIndex].lineItemNumber,
          statisticalGoodsNumber: resultTemp[nextIndex].statisticalGoodsNumber,
          purchaseOrderNumber: resultTemp[nextIndex].purchaseOrderNumber,
          scipNumber: resultTemp[nextIndex].scipNumber,
          scipRelavent: resultTemp[nextIndex].scipRelavent,
          materialCategory: resultTemp[nextIndex].materialCategory,
          submitStatus: resultTemp[nextIndex].submitStatus,
          casnumber: resultTemp[nextIndex].casnumber,
          isAddShow: true,
          isDeleteShow: false,
          isInvalid: false,
          isClearData: true,
          rowId: nextIndex + 1,
          isSubRow: false,
          isSCIPSpanShow: true,
          isSCIPEditShow: false,
          isStatSpanShow: true,
          isStatEditShow: false,
          isCasSpanShow: true,
          isCasEditShow: false,
          isMatSpanShow: true,
          isMatEditShow: false
        }

        resultTemp[nextIndex] = Object.assign({}, resultTemp[parentIndex])
        resultTemp[nextIndex].isSubRow = true
        resultTemp[nextIndex].isClearData = false

        for (var i = lastIndex; i != nextIndex && i > nextIndex; i--) {
          if (nextIndex != resultTemp.length - 1) {
            resultTemp[i] = resultTemp[i - 1]
            resultTemp[i].rowId = i
          }
        }
        resultTemp[nexttonextIndex] = nextIndexObj

      } else if (nextIndex == lastIndex) {
        resultTemp[lastIndex] = Object.assign({}, resultTemp[parentIndex])
        resultTemp[lastIndex].isSubRow = true
        resultTemp[lastIndex].isClearData = false

      }

      for (var i = 0; i < resultTemp.length; i++) {
        resultTemp[i].rowId = i;
      }
      this.isRowDuplicated = true
      this.results = Object.assign([], resultTemp);
      this.resultsTemp = Object.assign([], this.results);

      setTimeout(() => {                           // <<<---using ()=> syntax
        this.isRowDuplicated = false;
      }, 2000);
    } else if (resultTemp[parentIndex + 1] != undefined && resultTemp[parentIndex + 1].isSubRow) {
      resultTemp[parentIndex] = Object.assign({}, resultTemp[parentIndex + 1])
      resultTemp[parentIndex].isSubRow = false;
      resultTemp[parentIndex].isClearData = true;
      resultTemp[parentIndex].rowId = parentIndex
      this.results = Object.assign([], resultTemp);
    }


  }
  deleteRowIndex: number = -1;
  getDeleteRowIndex(parentIndex) {
    this.deleteRowIndex = parentIndex
    console.log(" delete row index " + this.deleteRowIndex);
  }
  deleteRow() {
    if (this.deleteRowIndex != -1) {
      let resultTemp = Object.assign([], this.results)
      resultTemp.splice(this.deleteRowIndex, 1);
      this.resultsTemp.splice(this.deleteRowIndex, 1);

      for (var i = 0; i < resultTemp.length; i++) {
        resultTemp[i].rowId = i;
        this.resultsTemp[i].rowId = i;
      }
      this.results = Object.assign([], resultTemp)
      this.resultsTemp = Object.assign([], this.results);
    }
    this.deleteRowIndex = -1
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
