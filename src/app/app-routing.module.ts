import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderLineItemComponent } from './purchase-order-line-item/purchase-order-line-item.component'

const routes: Routes = [
  { path: 'purchase-order-line-item.component', component: PurchaseOrderLineItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
