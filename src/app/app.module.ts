import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgxWebstorageModule} from 'ngx-webstorage'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { GenerateTokenComponent } from './generate-token/generate-token.component';
import { LoginComponent } from './login/login.component';

import { UtilService } from './util.service';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderLineItemComponent } from './purchase-order-line-item/purchase-order-line-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './service/auth-guard.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RecordSuccessComponent } from './record-success/record-success.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PurchaseOrderLineItemComponent,
    DashboardComponent,
    HeaderComponent,
    RecordSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [UtilService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
