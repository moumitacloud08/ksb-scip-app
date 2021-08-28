import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderLineItemComponent } from './purchase-order-line-item/purchase-order-line-item.component'
import { GeneratetokenComponent } from './generatetoken/generatetoken.component'

const routes: Routes = [
  { path: 'purchase-order-line-item', component: PurchaseOrderLineItemComponent },
  { path: 'generatetoken', component: GeneratetokenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
