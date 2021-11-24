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
import { TranslateService } from '@ngx-translate/core';
import * as cons from '../constants';
import { DatePipe } from '@angular/common';

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
    private utilService: UtilService,
    public translate: TranslateService,
  ) {
    this.results = [];
    translate.addLangs(cons.langArray);
    translate.setDefaultLang(cons.DEFAULT_LANG);
  }
  authToken;
  isPurchaseOrderSaved: boolean = false;
  responseCode: String = '';
  headElements: any = [];
  searchedKeyword: string;
  startIndex: number = 0
  endIndex: number = 4

  lang: string = ''
  appl: string = ''
  key: string = ''
  ngOnInit(): void {
    this.appl = this.localStorageService.retrieve("app")
    this.key = this.localStorageService.retrieve("key")
    this.lang = this.localStorageService.retrieve("lang")
    this.translate.use(this.lang);

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


  page = 1;
  count = 0;
  tableSize = 5;

  onTableDataChange(event) {
    this.page = event;
    this.count = this.results.length;
    //this.fetchPurchaseDetails();
    // this.fetchPurchaseDetailsTestData()
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPurchaseDetails();
    //this.fetchPurchaseDetailsTestData()
  }


  getSCIPRel(parentIndex, scipRel) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    this.results[parentIndex].scipRelavent = scipRel
    if (scipRel == '3') {
      this.results[parentIndex].scipNumber = ''
      this.results[parentIndex].statisticalGoodsNumber = ''
      this.results[parentIndex].casnumber = ''
      this.results[parentIndex].materialCategory = ''
      this.results[parentIndex].isbuttonDisabled = true
    } else if (scipRel == '1' || scipRel == '2') {
      if (!this.results[parentIndex].isSubRow) {
        let resultdata = this.results
        this.resultsPDFData.forEach(function (value) {
          if (value.lineItemNumber == resultdata[parentIndex].lineItemNumber) {
            console.log(value.lineItemNumber + " " + resultdata[parentIndex].lineItemNumber + " " + value.scipNumber);
            resultdata[parentIndex].scipNumber = value.scipNumber
            resultdata[parentIndex].statisticalGoodsNumber = value.statisticalGoodsNumber
            resultdata[parentIndex].casnumber = value.casnumber
            resultdata[parentIndex].materialCategory = value.materialCategory
          }
        })
        this.results = resultdata
      }
      this.results[parentIndex].isbuttonDisabled = false
    }

    // this.results[parentIndex].isSCIPSpanShow = true;
    // this.results[parentIndex].isSCIPEditShow = false;

    // this.results[parentIndex].isStatSpanShow = true;
    // this.results[parentIndex].isStatEditShow = false;

    // this.results[parentIndex].isCasSpanShow = true;
    // this.results[parentIndex].isCasEditShow = false;

    // this.results[parentIndex].isMatSpanShow = true;
    // this.results[parentIndex].isMatEditShow = false;

  }
  clearSCIPData(parentIndex) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    this.results[parentIndex].scipNumber = ''
    //this.validatSingleRow(parentIndex)
  }
  clearStatisticalData(parentIndex) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    this.results[parentIndex].statisticalGoodsNumber = ''
    // this.validatSingleRow(parentIndex)
  }
  clearCasNum(parentIndex) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    this.results[parentIndex].casnumber = ''
    // this.validatSingleRow(parentIndex)
  }
  clearMatCat(parentIndex) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    this.results[parentIndex].materialCategory = ''
    //  this.validatSingleRow(parentIndex)
  }
  prevRow = -1
  mouseEnterRow(parentIndex) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    if (this.prevRow != -1 && this.prevRow != parentIndex) {
      this.results[this.prevRow].isRowHover = false
    }
    this.prevRow = parentIndex
    this.results[parentIndex].isRowHover = true
  }
  mouseLeaveRow(parentIndex) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    this.results[parentIndex].isRowHover = false

  }
  prevIndex: number
  mouseEnter(parentIndex, field) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    console.log(" MOUSE ENTER " + this.prevIndex + " ---- " + parentIndex);

    if (this.prevIndex != parentIndex) {
      let resultTemp = this.resultsTemp
      for (var i = 0; i < resultTemp.length; i++) {
        if (i == this.prevIndex) {
          if (this.results[this.prevIndex].scipNumber != resultTemp[i].scipNumber || this.results[this.prevIndex].statisticalGoodsNumber != resultTemp[i].statisticalGoodsNumber || this.results[this.prevIndex].casnumber != resultTemp[i].casnumber || this.results[this.prevIndex].materialCategory != resultTemp[i].materialCategory) {
            this.validatSingleRow(this.prevIndex)
          }
        }
      }
    }


    if (this.activeParentIndex !== parentIndex) {
      this.activeParentIndex = parentIndex;
      this.resetAllRow();
      this.results[parentIndex].isAddShow = false;
      this.results[parentIndex].isDeleteShow = true;
      if (field == 'scip') {

        let results = this.results

        var count = 0;
        let emptySCIPValue = 0
        console.log("scip number : " + results[parentIndex].scipNumber);
        // console.log(results);
        results.forEach(function (value) {
          if (count != parentIndex && results[count].lineItemNumber == results[parentIndex].lineItemNumber) {
            if (results[count].scipNumber != '') {
              emptySCIPValue++
            }
          }
          count++
        })

        if (emptySCIPValue > 0) {
          this.results[parentIndex].isSCIPSpanShow = true;
          this.results[parentIndex].isSCIPEditShow = false;
        } else if (emptySCIPValue == 0) {
          this.results[parentIndex].isSCIPSpanShow = false;
          this.results[parentIndex].isSCIPEditShow = true;
        }
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

      if (this.results[parentIndex].scipRelavent == '3') {
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
  mouseLeaveTab() {
    console.log("MOUSE mouseLeaveTab :");
    if (this.prevRow != -1) {
      this.results[this.prevRow].isRowHover = false
    }
    // this.results[parentIndex].isRowHover = false
  }
  mouseLeave(parentIndex) {

    parentIndex = (this.page - 1) * 5 + parentIndex
    this.prevIndex = parentIndex
    // console.log("MOUSE ---- LEAVE "+parentIndex+" --- "+this.activeParentIndex);
    this.results[parentIndex].isRowHover = false
    this.activeParentIndex = null;
    this.resetAllRow();
    if (this.results[parentIndex + 1] == undefined || (parentIndex + 1) % 5 === 0) {
      console.log("INSIDE LAST INDEX");
      this.validatSingleRow(parentIndex)
    }
  }
  clickevent(parentIndex) {
    parentIndex = (this.page - 1) * 5 + parentIndex
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
    parentIndex = (this.page - 1) * 5 + parentIndex
    this.results[parentIndex].scipNumber = '';
    this.results[parentIndex].statisticalGoodsNumber = '';
    this.results[parentIndex].casnumber = '';
    this.results[parentIndex].materialCategory = '';
    // this.resetAllRow();
  }
  response: any;
  resultsTemp: purchasedetails[];
  resultsPDFData: purchasedetails[];
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
        this.resultsTemp = JSON.parse(JSON.stringify(this.resultsTemp));
        //this.configurepagination();
        this.resultsPDFData = Object.assign([], this.results);
        this.resultsPDFData = JSON.parse(JSON.stringify(this.resultsPDFData));

        this.count = this.results.length
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
        this.resultsTemp = JSON.parse(JSON.stringify(this.resultsTemp));

        this.resultsPDFData = Object.assign([], this.results);
        this.resultsPDFData = JSON.parse(JSON.stringify(this.resultsPDFData));

        // this.configurepagination();
        this.count = this.results.length
      })
      .catch((error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
  }
  validateScip(parentIndex: number) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    this.results[parentIndex].scipNumber =
      this.results[parentIndex].scipNumber.replace(/[&\/\\#,+()$~%.'":*?<>@{}]/g, '')
    if (this.results[parentIndex].scipNumber.length > 40) {
      this.results[parentIndex].scipNumber = this.results[parentIndex].scipNumber.slice(0, -1);
    }
    //this.validatSingleRow(parentIndex)
  }
  validateStatGood(parentIndex: number) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    this.results[parentIndex].statisticalGoodsNumber =
      this.results[parentIndex].statisticalGoodsNumber.replace(/[^0-9]/g, '')
    if (this.results[parentIndex].statisticalGoodsNumber.length < 8) {
      this.results[parentIndex].isStatGoodInvalid = true;
      this.results[parentIndex].isStatEmpty = false
      this.results[parentIndex].isRowInvalid = true
    } else {
      this.results[parentIndex].isStatEmpty = false
      this.results[parentIndex].isStatGoodInvalid = false;
    }
    if (this.results[parentIndex].statisticalGoodsNumber.length > 17) {
      this.results[parentIndex].statisticalGoodsNumber = this.results[parentIndex].statisticalGoodsNumber.slice(0, -1);
    }
    // this.validatSingleRow(parentIndex)
  }
  validateCASNo(parentIndex: number) {
    parentIndex = (this.page - 1) * 5 + parentIndex
    this.results[parentIndex].casnumber =
      this.results[parentIndex].casnumber.replace(/[&\/\\#,+()$~%.'":*?<>@{}]/g, '')
    this.results[parentIndex].isCASNumberEmpty = false
    if (this.results[parentIndex].casnumber.length > 20) {
      this.results[parentIndex].casnumber = this.results[parentIndex].casnumber.slice(0, -1);
    }
    // this.validatSingleRow(parentIndex)
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
  isLengthZero: boolean = false;
  savePurchaseorderLine() {
    let dataChangeCount = 0;
    let dataList = []
    let resultTemp = Object.assign([], this.resultsTemp);
    this.results = this.validateRow(this.results)
    let rowInvalidCount = 0;

    this.results.forEach(function (valueNew) {
      // console.log(valueNew.scipNumber+" --- "+valueNew.statisticalGoodsNumber +" --- "+valueNew.casnumber + " "+valueNew.materialCategory);
      if (valueNew.scipNumber == '' && valueNew.statisticalGoodsNumber == '' &&
        valueNew.casnumber == '' && valueNew.materialCategory == '') {
        dataChangeCount++;
      }
      // if (valueNew.isRowInvalid == true) {
      //   rowInvalidCount++
      // }
      resultTemp.forEach(function (valueOld) {
        if (valueNew.rowId == valueOld.rowId) {
          if (valueNew.scipNumber != valueOld.scipNumber || valueNew.statisticalGoodsNumber != valueOld.statisticalGoodsNumber ||
            valueNew.casnumber != valueOld.casnumber || valueNew.materialCategory != valueOld.materialCategory
            || valueNew.scipRelavent != valueOld.scipRelavent) {
            if (valueNew.isRowInvalid == true) {
              rowInvalidCount++
            } else if (valueNew.isRowInvalid == false) {
              dataList.push(valueNew);
            }

          } else {
            valueNew.isSCIPEmpty = false
            valueNew.isStatEmpty = false
            valueNew.isCASNumberEmpty = false
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
      if (value.scipRelavent == null) {
        value.scipRelavent = "1"
      }
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
    console.log("data change : " + dataChangeCount + " " + this.results.length);
    if (dataChangeCount != this.results.length) {
      this.isAllDataCleared = false
    }

    console.log("<=========params==============>")
    console.log(JSON.stringify(params));
    console.log(params)
    if (!this.isAllDataCleared) {
      this.purchaseOrderLineItemService
        .savePurchaseorderLine(params)
        .then((data) => {
          console.log(JSON.stringify(data));
          this.response = JSON.parse(JSON.stringify(data));
          this.responseCode = this.response.code;
          //this.responseCode = '200';
          if (this.responseCode == '200') {
            this.localStorageService.store('savedData', dataListFinal)

            this.localStorageService.clear('user');
            this.localStorageService.clear('api_token');
            this.isPurchaseOrderSaved = true;
            this.isAllDataCleared = false;
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
    } else {
      if (dataListFinal.length == 0) {
        this.isLengthZero = true;
        setTimeout(() => {                           // <<<---using ()=> syntax
          this.isLengthZero = false;
        }, 1500);
      }

    }
  }

  validateRow(results) {
    results.forEach(function (value) {
      value.isCASNumberEmpty = false
      value.isStatEmpty = false;
      value.isRowInvalid = false

      let emptySCIPValue = 0
      results.forEach(function (value2) {
        if (value.lineItemNumber == value2.lineItemNumber) {
          if (value2.scipNumber != '') {
            emptySCIPValue++
          }
        }
      })
      if (emptySCIPValue == 0) {
        value.isSCIPEmpty = true
      }
      if (value.statisticalGoodsNumber == '') {
        value.isStatEmpty = true;
      }
      if (value.casnumber == '') {
        value.isCASNumberEmpty = true
      }
      if (!value.isSCIPEmpty && value.isStatEmpty && value.isCASNumberEmpty) {
        value.isRowInvalid = false
      } else if (value.isSCIPEmpty && !value.isStatEmpty && !value.isCASNumberEmpty) {
        value.isRowInvalid = false
      } else if (!value.isSCIPEmpty && !value.isStatEmpty && !value.isCASNumberEmpty) {
        value.isRowInvalid = false
      } else if (!value.isSCIPEmpty && !value.isStatEmpty && value.isCASNumberEmpty) {
        value.isRowInvalid = true
      } else if (!value.isSCIPEmpty && value.isStatEmpty && !value.isCASNumberEmpty) {
        value.isRowInvalid = true
      } else if (value.isSCIPEmpty && value.isStatEmpty && !value.isCASNumberEmpty) {
        value.isRowInvalid = true
      } else if (value.isSCIPEmpty && !value.isStatEmpty && value.isCASNumberEmpty) {
        value.isRowInvalid = true
      }
      if (value.statisticalGoodsNumber.length < 8) {
        value.isRowInvalid = true
      }
    });
    return results;
  }

  isRowDuplicated: boolean = false;
  editPurchaseorderLine(parentIndex: number, rowId: number) {
    // this.results[parentIndex].isAddShow = false;
    // this.results[parentIndex].isDeleteShow = true;
    parentIndex = (this.page - 1) * 5 + parentIndex
    console.log(this.page + " ----- " + parentIndex + " --- " + rowId);
    let resultTemp = Object.assign([], this.results);
    console.log("Parent index subrow: " + resultTemp[parentIndex].isSubRow);
    //  if (resultTemp[parentIndex + 1] === undefined || !resultTemp[parentIndex + 1].isSubRow) {
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
      isMatEditShow: false,
      isStatGoodInvalid: false,
      isRowInvalid: false,
      parentRowId: -1,
      isRowHover: false,
      isCASNumberEmpty: false,
      isStatEmpty: false,
      isSCIPEmpty: false,
      isbuttonDisabled: false
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
        isClearData: resultTemp[nextIndex].isClearData,
        rowId: nextIndex + 1,
        isSubRow: resultTemp[nextIndex].isSubRow,
        isSCIPSpanShow: true,
        isSCIPEditShow: false,
        isStatSpanShow: true,
        isStatEditShow: false,
        isCasSpanShow: true,
        isCasEditShow: false,
        isMatSpanShow: true,
        isMatEditShow: false,
        isStatGoodInvalid: false,
        isRowInvalid: false,
        parentRowId: resultTemp[nextIndex].parentRowId,
        isRowHover: false,
        isCASNumberEmpty: false,
        isStatEmpty: false,
        isSCIPEmpty: false,
        isbuttonDisabled: false
      }

      resultTemp[nextIndex] = Object.assign({}, resultTemp[parentIndex])
      resultTemp[nextIndex].scipNumber = ''
      resultTemp[nextIndex].statisticalGoodsNumber = ''
      resultTemp[nextIndex].casnumber = ''
      resultTemp[nextIndex].isSubRow = true
      resultTemp[nextIndex].isClearData = false
      resultTemp[nextIndex].parentRowId = parentIndex

      for (var i = lastIndex; i != nextIndex && i > nextIndex; i--) {
        if (nextIndex != resultTemp.length - 1) {
          resultTemp[i] = resultTemp[i - 1]
          resultTemp[i].rowId = i
        }
      }

      console.log("nexttonextIndex : " + nexttonextIndex + " -- " + nextIndexObj.isSubRow);
      console.log(nextIndexObj);
      if (nextIndexObj != undefined && nextIndexObj.isSubRow == true
        && nextIndexObj.parentRowId != -1) {
        resultTemp[nexttonextIndex] = nextIndexObj
        resultTemp[nexttonextIndex].isSubRow = true
        resultTemp[nexttonextIndex].isClearData = false
        resultTemp[nexttonextIndex].parentRowId = parentIndex
      } else if (nextIndexObj != undefined && nextIndexObj.isSubRow == false
        && nextIndexObj.parentRowId == -1) {
        resultTemp[nexttonextIndex] = nextIndexObj
      }
      //  resultTemp[nexttonextIndex] = nextIndexObj

    } else if (nextIndex == lastIndex) {
      resultTemp[lastIndex] = Object.assign({}, resultTemp[parentIndex])
      resultTemp[nextIndex].isSubRow = true
      resultTemp[lastIndex].isClearData = false

    }

    for (var i = 0; i < resultTemp.length; i++) {
      resultTemp[i].rowId = i;
    }

    this.isRowDuplicated = true
    this.results = Object.assign([], resultTemp);
    this.resultsTemp = Object.assign([], this.results);
    this.count = this.results.length
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.isRowDuplicated = false;
    }, 1500);

    if (!resultTemp[parentIndex].isSubRow) {
      resultTemp[parentIndex].isSubRow = false;
      resultTemp[parentIndex].isClearData = true;
    }
    this.validatSingleRow(parentIndex)
  }
  invalidRowCount = 0
  checkRowvalidity() {
    console.log("===========");
    this.invalidRowCount = 0
    let invalidRowCount = this.invalidRowCount;
    this.results.forEach(function (value) {
      if (value.isRowInvalid == true) {
        invalidRowCount++
      }
    })
    this.invalidRowCount = invalidRowCount
  }
  validatSingleRow(parentIndex) {
    let results = this.results

    results[parentIndex].isCASNumberEmpty = false
    results[parentIndex].isStatEmpty = false;
    results[parentIndex].isRowInvalid = false

    let emptySCIPValue = 0
    results.forEach(function (value2) {
      if (results[parentIndex].lineItemNumber == value2.lineItemNumber) {
        if (value2.scipNumber != '') {
          emptySCIPValue++
        }
      }
    })
    if (emptySCIPValue == 0) {
      results[parentIndex].isSCIPEmpty = true
    }
    if (results[parentIndex].statisticalGoodsNumber == '') {
      results[parentIndex].isStatEmpty = true;
    }
    if (results[parentIndex].casnumber == '') {
      results[parentIndex].isCASNumberEmpty = true
    }
    if (!results[parentIndex].isSCIPEmpty && results[parentIndex].isStatEmpty && results[parentIndex].isCASNumberEmpty) {
      results[parentIndex].isRowInvalid = false
    } else if (results[parentIndex].isSCIPEmpty && !results[parentIndex].isStatEmpty && !results[parentIndex].isCASNumberEmpty) {
      results[parentIndex].isRowInvalid = false
    } else if (!results[parentIndex].isSCIPEmpty && !results[parentIndex].isStatEmpty && !results[parentIndex].isCASNumberEmpty) {
      results[parentIndex].isRowInvalid = false
    } else if (!results[parentIndex].isSCIPEmpty && !results[parentIndex].isStatEmpty && results[parentIndex].isCASNumberEmpty) {
      results[parentIndex].isRowInvalid = true
    } else if (!results[parentIndex].isSCIPEmpty && results[parentIndex].isStatEmpty && !results[parentIndex].isCASNumberEmpty) {
      results[parentIndex].isRowInvalid = true
    } else if (results[parentIndex].isSCIPEmpty && results[parentIndex].isStatEmpty && !results[parentIndex].isCASNumberEmpty) {
      results[parentIndex].isRowInvalid = true
    } else if (results[parentIndex].isSCIPEmpty && !results[parentIndex].isStatEmpty && results[parentIndex].isCASNumberEmpty) {
      results[parentIndex].isRowInvalid = true
    }
    if (results[parentIndex].statisticalGoodsNumber.length < 8) {
      results[parentIndex].isRowInvalid = true
    }
    this.results = results
  }
  deleteRowIndex: number = -1;
  getDeleteRowIndex(parentIndex) {
    parentIndex = (this.page - 1) * 5 + parentIndex
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
      //this.resultsTemp = Object.assign([], this.results);
    }
    this.count = this.results.length
    this.deleteRowIndex = -1
  }
  isAllDataClearedShowAlert: boolean = false
  isAllDataCleared: boolean = false
  ClearAllTableData() {
    var count = 0
    this.results.forEach(function (value) {
      console.log(value);
      value.scipNumber = ''
      value.casnumber = ''
      value.statisticalGoodsNumber = ''
      value.materialCategory = ''
      count++
    });
    this.isAllDataClearedShowAlert = true;
    this.isAllDataCleared = true;
    if (count > 0) {
      setTimeout(() => {                           // <<<---using ()=> syntax
        this.isAllDataClearedShowAlert = false;
      }, 1500);
    }

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
    this.resultsPDFData.forEach(function (value) {
      //console.log(value);
      if (value.scipRelavent == '' || value.scipRelavent == null || value.scipRelavent == '1') {
        value.scipRelavent = 'Select'
      }
      else if (value.scipRelavent == '2') {
        value.scipRelavent = 'Yes'
      }
      else if (value.scipRelavent == '3') {
        value.scipRelavent = 'No'
      }
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
  today: number = Date.now();
  pipe = new DatePipe('en-US'); // Use your own locale
  now = Date.now();
  myFormattedDate = this.pipe.transform(this.now, 'dd MMMM y');
  myFormattedTime = this.pipe.transform(this.now, 'h:mm a');

  public SavePDF() {
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
    console.log("height: " + height)
    doc.setFontSize(8);
    doc.text("Date of submissions:- " + this.myFormattedDate + " | " + this.myFormattedTime, 13, height + 60);
    let imagedata = "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"
    doc.addImage(imagedata, 'JPEG', 13, 8, 20, 20);
    // Open PDF document in new tab

    // The y position on the page

    doc.output('dataurlnewwindow')

    // Download PDF document  
    doc.save('table.pdf');
  }
}
