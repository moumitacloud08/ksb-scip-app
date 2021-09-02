import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderLineItemComponent } from './purchase-order-line-item/purchase-order-line-item.component'
import { GeneratetokenComponent } from './generatetoken/generatetoken.component'
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'purchase-order-line-item', component: PurchaseOrderLineItemComponent },
  { path: '', component: GeneratetokenComponent },
  { path: 'login', component: LoginComponent },
  // { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
