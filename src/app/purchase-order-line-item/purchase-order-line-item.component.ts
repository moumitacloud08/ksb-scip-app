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
  styleUrls: ['./purchase-order-line-item.component.css']
})
export class PurchaseOrderLineItemComponent implements OnInit {
  faPlus = faPlus;
  faLessThan = faLessThan;
  faGreaterThan = faGreaterThan;
  faFilePdf = faFilePdf;
  isCatergoryList: Boolean = true;
  selectedCat: string = '';
  iconPlusCircle = 'assets/images/pluscircle.png';
  iconPlusAlt = 'add';
  iconPDF = 'assets/images/pdficon2.png';
  iconPDFAlt = 'pdf';
  iconArrow = 'assets/images/arrowicon.png';
  iconArrowAlt = 'select';

  constructor(private localStorageService: LocalStorageService) { }
  authToken;
  ngOnInit(): void {
    this.authToken = this.localStorageService.retrieve('user').authToken;
    console.log(' this.authToken In login ');
    console.log(this.authToken);
  }
  selectMaterial(item: any, parentIndex: any, elements: any) {

    this.isCatergoryList = true;
    this.selectedCat = item;
    this.isCatergoryList = !this.isCatergoryList;

    if (item !='' && item != 'materialCategory') {
      elements[parentIndex].isSelected = true;
      elements[parentIndex].selectedCat = item;
    }
  }

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
