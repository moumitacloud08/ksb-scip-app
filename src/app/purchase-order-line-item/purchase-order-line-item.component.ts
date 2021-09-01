import { Component, OnInit } from '@angular/core';
import { AppComponent } from '.././app.component';
import { faPlus,faGreaterThan,faLessThan,faFilePdf } from '@fortawesome/free-solid-svg-icons';

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
  iconPlusCircle = 'assets/Image/pluscircle.png' 
  iconPlusAlt="add"
  constructor(public appComponent: AppComponent) {
    appComponent.isLoggenIn = true;
   }

  ngOnInit(): void {
  }

  elements: any = [ {
    "statisticalGoodsNumber" : 5,
    "CASNumber" : 5,
    "purchaseOrderNumber" : 45654756,
    "scipNumber" : 1,
    "lineItemNumber" : 6,
    "scipRelevent" : "Yes",
    "materialCategory" : "materialCategory",
    "submitStatus" : "submitted"
  }, {
    "statisticalGoodsNumber" : 5,
    "CASNumber" : 5,
    "purchaseOrderNumber" : 45654756,
    "scipNumber" : 1,
    "lineItemNumber" : 6,
    "scipRelevent" : "Yes",
    "materialCategory" : "materialCategory",
    "submitStatus" : "submitted"
  },
  {
    "statisticalGoodsNumber" : 5,
    "CASNumber" : 5,
    "purchaseOrderNumber" : 45654756,
    "scipNumber" : 1,
    "lineItemNumber" : 6,
    "scipRelevent" : "Yes",
    "materialCategory" : "materialCategory",
    "submitStatus" : "submitted"
  },
  {
    "statisticalGoodsNumber" : 9,
    "CASNumber" : 5,
    "purchaseOrderNumber" : 45654756,
    "scipNumber" : 1,
    "lineItemNumber" : 6,
    "scipRelevent" : "Yes",
    "materialCategory" : "materialCategory",
    "submitStatus" : "submitted"
  },
  {
    "statisticalGoodsNumber" : 7,
    "CASNumber" : 5,
    "purchaseOrderNumber" : 45654756,
    "scipNumber" : 1,
    "lineItemNumber" : 6,
    "scipRelevent" : "Yes",
    "materialCategory" : "materialCategory",
    "submitStatus" : "submitted"
  } ];

  headElements = ['Purchase Order', 'Line Item', 'SCIP Relevant', 'SCIP No.', 'Statistical Goods No', 'CAS No', 'Material Category','Action'];

}
