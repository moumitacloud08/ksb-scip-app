import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  faGreaterThan,
  faLessThan,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';
import { PurchaseOrderLineItemService } from '../service/purchase-order-line-item.service';
import { purchasedetails } from '.././purchasedetail'

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
  results: purchasedetails[];
  constructor(private localStorageService: LocalStorageService, private purchaseOrderLineItemService:PurchaseOrderLineItemService) {
    this.results = [];
  }
  authToken;
  isPurchaseOrderSaved:boolean=false;
  responseCode: String = '';
  headElements:any=[];
  
 
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
      'Action',
    ];
    

    this.fetchPurchaseDetails()

  }
response:any;
  fetchPurchaseDetails() {
     this.purchaseOrderLineItemService.fetchPurchaseDetails() .then((data) => {
      console.log(JSON.stringify(data));
      this.response = JSON.parse(JSON.stringify(data));
      this.results = this.response.scipDetails.map(item => {
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
          item.isDeleteShow
        );
      });
      console.log(" <===this.results====>")
      console.log( JSON.parse(JSON.stringify(this.results)))
    })
    .catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
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
  errorMessage:string=''
  savePurchaseorderLine() {
    this.responseCode='200'
    if (this.responseCode == '200') {
      this.isPurchaseOrderSaved=true;
    } else {
      this.isPurchaseOrderSaved=false;
      this.errorMessage ="Something went wrong . Please try after something"
    }
  }

  editPurchaseorderLine(parentIndex) {
    this.results[parentIndex].isAddShow = false;
    this.results[parentIndex].isDeleteShow = true;
  }
  resetPurchaseorderLine() {
    this.fetchPurchaseDetails()
    this.headElements = [
      'Purchase Order',
      'Line Item',
      'SCIP Relevant',
      'SCIP No.',
      'Statistical Goods No',
      'CAS No',
      'Material Category',
      'Action',
    ];
  }
  
}
