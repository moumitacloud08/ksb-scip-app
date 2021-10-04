import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { GenerateTokenComponent } from './generate-token/generate-token.component'
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PurchaseOrderLineItemComponent } from './purchase-order-line-item/purchase-order-line-item.component';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { AuthGuardService as AuthGuard} from './service/auth-guard.service';
import { RecordSuccessComponent } from './record-success/record-success.component';


const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent,
        children: [
            // {
            //     path: '',
            //     component: GenerateTokenComponent
            // },
            {
                path: '',
                component: LoginComponent
            },
             {
                path: 'vendorplatform',
                component: LoginComponent
            }
        ]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children:[
            {
                path: 'purchase-order-line-item',
                component: PurchaseOrderLineItemComponent
                //component: PurchaseOrderLineItemComponent,canActivate:[AuthGuard]
            }
        ]
    },
    {
        path: 'record-success',
        component: RecordSuccessComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }