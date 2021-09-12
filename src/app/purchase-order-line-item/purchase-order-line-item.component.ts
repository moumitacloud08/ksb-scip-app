import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  faGreaterThan,
  faLessThan,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';

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

  constructor(private localStorageService: LocalStorageService) {}
  authToken;
  isPurchaseOrderSaved:boolean=false;
  responseCode: String = '';
  headElements:any=[];
  elements: any = [];
  elementsTemp: any = [];
 
  ngOnInit(): void {
    this.authToken = this.localStorageService.retrieve('user').authToken;
    console.log(' this.authToken In login ');
    console.log(this.authToken);


    this.elements = [
      {
        statisticalGoodsNumber: 5,
        CASNumber: 5,
        purchaseOrderNumber: 45654756,
        scipNumber: 15657756,
        lineItemNumber: 6,
        scipRelevent: 'Yes',
        // materialCategory: ['sample56', 'sample2', 'sample3'],
        materialCategory: 'Silver',
        submitStatus: 'submitted',
        isAddShow: true,
        isDeleteShow: false
      },
      {
        statisticalGoodsNumber: 5,
        CASNumber: 5,
        purchaseOrderNumber: 45654756,
        scipNumber: 167657,
        lineItemNumber: 6,
        scipRelevent: 'Yes',
        // materialCategory: ['sample1', 'sample2', 'sample89'],
        materialCategory: 'Copper',
        submitStatus: 'submitted',
        isAddShow: true,
        isDeleteShow: false
      },
      {
        statisticalGoodsNumber: 5,
        CASNumber: 5,
        purchaseOrderNumber: 45654756,
        scipNumber: 1657435,
        lineItemNumber: 6,
        scipRelevent: 'Yes',
        // materialCategory: ['sample1', 'sample2', 'sample3'],
        materialCategory: 'Iron',
        submitStatus: 'submitted',
        isAddShow: true,
        isDeleteShow: false
      },
      {
        statisticalGoodsNumber: 9,
        CASNumber: 5,
        purchaseOrderNumber: 45654756,
        scipNumber: 4565771,
        lineItemNumber: 6,
        scipRelevent: 'Yes',
        // materialCategory: ['sample1', 'sample2', 'sample3'],
        materialCategory: 'Gold',
        submitStatus: 'submitted',
        isAddShow: true,
        isDeleteShow: false
      },
      {
        statisticalGoodsNumber: 7,
        CASNumber: 5,
        purchaseOrderNumber: 45654756,
        scipNumber: 98677761,
        lineItemNumber: 6,
        scipRelevent: 'Yes',
        // materialCategory: ['sample5', 'sample2', 'sample3'],
        materialCategory: 'Silver',
        submitStatus: 'submitted',
        isAddShow: true,
        isDeleteShow: false
      },
    ];
    
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
    this.elementsTemp = this.elements;
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
    this.elements[parentIndex].isAddShow = false;
    this.elements[parentIndex].isDeleteShow = true;
  }
  resetPurchaseorderLine() {
    this.elements = [
      {
        statisticalGoodsNumber: 5,
        CASNumber: 5,
        purchaseOrderNumber: 45654756,
        scipNumber: 15657756,
        lineItemNumber: 6,
        scipRelevent: 'Yes',
        // materialCategory: ['sample56', 'sample2', 'sample3'],
        materialCategory: 'Silver',
        submitStatus: 'submitted',
        isAddShow: true,
        isDeleteShow: false
      },
      {
        statisticalGoodsNumber: 5,
        CASNumber: 5,
        purchaseOrderNumber: 45654756,
        scipNumber: 167657,
        lineItemNumber: 6,
        scipRelevent: 'Yes',
        // materialCategory: ['sample1', 'sample2', 'sample89'],
        materialCategory: 'Copper',
        submitStatus: 'submitted',
        isAddShow: true,
        isDeleteShow: false
      },
      {
        statisticalGoodsNumber: 5,
        CASNumber: 5,
        purchaseOrderNumber: 45654756,
        scipNumber: 1657435,
        lineItemNumber: 6,
        scipRelevent: 'Yes',
        // materialCategory: ['sample1', 'sample2', 'sample3'],
        materialCategory: 'Iron',
        submitStatus: 'submitted',
        isAddShow: true,
        isDeleteShow: false
      },
      {
        statisticalGoodsNumber: 9,
        CASNumber: 5,
        purchaseOrderNumber: 45654756,
        scipNumber: 4565771,
        lineItemNumber: 6,
        scipRelevent: 'Yes',
        // materialCategory: ['sample1', 'sample2', 'sample3'],
        materialCategory: 'Gold',
        submitStatus: 'submitted',
        isAddShow: true,
        isDeleteShow: false
      },
      {
        statisticalGoodsNumber: 7,
        CASNumber: 5,
        purchaseOrderNumber: 45654756,
        scipNumber: 98677761,
        lineItemNumber: 6,
        scipRelevent: 'Yes',
        // materialCategory: ['sample5', 'sample2', 'sample3'],
        materialCategory: 'Silver',
        submitStatus: 'submitted',
        isAddShow: true,
        isDeleteShow: false
      },
    ];
    
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
