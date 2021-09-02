import { Component, OnInit } from '@angular/core';
import { AppComponent } from '.././app.component';
import {
  faPlus,
  faGreaterThan,
  faLessThan,
  faFilePdf,
} from '@fortawesome/free-solid-svg-icons';

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
  iconPlusCircle = 'assets/Image/pluscircle.png';
  iconPlusAlt = 'add';
  iconPDF = 'assets/Image/pdficon2.png';
  iconPDFAlt = 'pdf';
  iconArrow = 'assets/Image/arrowicon.png';
  iconArrowAlt = 'select';
  constructor(public appComponent: AppComponent) {
    appComponent.isLoggenIn = true;
  }
  isCatergoryList: Boolean = true;
  selectedCat: string = '';
  // showMaterialCatList() {
  //   this.isCatergoryList = !this.isCatergoryList;
  // }
  selectMaterial(item, parentIndex, elements) {

    this.isCatergoryList = true;
    this.selectedCat = item;
    this.isCatergoryList = !this.isCatergoryList;

    if (item !='' && item != 'materialCategory') {
      elements[parentIndex].isSelected = true;
      elements[parentIndex].selectedCat = item;
      // for (var i = 0; i < materialCatList.length; i++) {
      //   if (i == index) {
      //     this.isCatergoryList = true;
      //     this.selectedCat = item;
      //   }
      // }     
    }
  }

  ngOnInit(): void {}

  elements: any = [
    {
      statisticalGoodsNumber: 5,
      CASNumber: 5,
      purchaseOrderNumber: 45654756,
      scipNumber: 1,
      lineItemNumber: 6,
      scipRelevent: 'Yes',
      materialCategory: ['sample56', 'sample2', 'sample3'],
      submitStatus: 'submitted',
      isSelected: false,
      selectedCat: ''
    },
    {
      statisticalGoodsNumber: 5,
      CASNumber: 5,
      purchaseOrderNumber: 45654756,
      scipNumber: 1,
      lineItemNumber: 6,
      scipRelevent: 'Yes',
      materialCategory: ['sample1', 'sample2', 'sample89'],
      submitStatus: 'submitted',
      isSelected: false,
      selectedCat: ''
    },
    {
      statisticalGoodsNumber: 5,
      CASNumber: 5,
      purchaseOrderNumber: 45654756,
      scipNumber: 1,
      lineItemNumber: 6,
      scipRelevent: 'Yes',
      materialCategory: ['sample1', 'sample2', 'sample3'],
      submitStatus: 'submitted',
      isSelected: false,
      selectedCat: ''
    },
    {
      statisticalGoodsNumber: 9,
      CASNumber: 5,
      purchaseOrderNumber: 45654756,
      scipNumber: 1,
      lineItemNumber: 6,
      scipRelevent: 'Yes',
      materialCategory: ['sample1', 'sample2', 'sample3'],
      submitStatus: 'submitted',
      isSelected: false,
      selectedCat: ''
    },
    {
      statisticalGoodsNumber: 7,
      CASNumber: 5,
      purchaseOrderNumber: 45654756,
      scipNumber: 1,
      lineItemNumber: 6,
      scipRelevent: 'Yes',
      materialCategory: ['sample5', 'sample2', 'sample3'],
      submitStatus: 'submitted',
      isSelected: false,
      selectedCat: ''
    },
  ];

  headElements = [
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
