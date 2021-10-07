import {
    inject,
    tick,
    TestBed,
    getTestBed,
    async,
    fakeAsync,
    ComponentFixture,
} from '@angular/core/testing';
import { PurchaseOrderLineItemComponent } from './purchase-order-line-item.component';
import {
    NgxWebstorageModule,
    LocalStorageService,
} from 'ngx-webstorage';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { PurchaseOrderLineItemService } from '../service/purchase-order-line-item.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateService, TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

describe('LoginComponent', () => {
    let component: PurchaseOrderLineItemComponent;
    let fixture: ComponentFixture<PurchaseOrderLineItemComponent>;
    let service: PurchaseOrderLineItemService;
    let localStorageService: LocalStorageService;
    // const location: Location = TestBed.inject(Location);
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NgxWebstorageModule.forRoot(),
                RouterTestingModule,
                TranslateTestingModule,
                NgxPaginationModule,
                Ng2SearchPipeModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader
                    }
                })
            ],
            declarations: [PurchaseOrderLineItemComponent],
            providers: [LocalStorageService, TranslateService,]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PurchaseOrderLineItemComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(PurchaseOrderLineItemService);
        localStorageService = TestBed.inject(LocalStorageService);
        spyOn(localStorageService, 'clear').and.returnValue();
        //spyOn(localStorageService, 'store').and.returnValue("6765");
        let store = { "app": "scip", "key": "6765", "lang": "en", "user": { authToken: 'a3NiOmtzYg==' }, "api_token": "123456789" }
        spyOn(localStorageService, 'retrieve').and.callFake((key) => { return store[key] });


        component.results = [{
            "lineItemNumber": "8890986",
            "statisticalGoodsNumber": "456547678",
            "purchaseOrderNumber": "2235466",
            "scipNumber": "89907554",
            "scipRelavent": "false",
            "materialCategory": "Iron",
            "submitStatus": "Yes",
            "casnumber": "2212345",
            isAddShow: false,
            isDeleteShow: false,
            isInvalid: false,
            isClearData: false,
            rowId: 3,
            isSubRow: false,
            isSCIPSpanShow: true,
            isSCIPEditShow: false,
            isStatSpanShow: true,
            isStatEditShow: false,
            isCasSpanShow: true,
            isCasEditShow: false,
            isMatSpanShow: true,
            isMatEditShow: false,
            isStatGoodInvalid: false
        }]
        component.page = 1
        fixture.detectChanges();
    });


    it('Test fetchpurchase details', fakeAsync(() => {

        let data = [{
            "lineItemNumber": 8890986,
            "statisticalGoodsNumber": "456547678",
            "purchaseOrderNumber": 2235466,
            "scipNumber": "89907554",
            "scipRelavent": null,
            "materialCategory": "Iron",
            "submitStatus": "Yes",
            "casnumber": "2212345"
        }]
        let spy = spyOn(service, 'fetchPurchaseDetails').and.returnValue(Promise.resolve(data));
        component.fetchPurchaseDetails();
        expect(spy).toHaveBeenCalled();
    }));

    it('Test onTableDataChange', fakeAsync(() => {
        var event: Event
        component.onTableDataChange(event);
        expect(component.results.length).toBe(1);
    }));
    it('Test onTableSizeChange', fakeAsync(() => {
        var event: any
        event = { target: { value: 10 } }
        component.onTableSizeChange(event);
        expect(component.page).toBe(1);
    }));
    it('Test getSCIPRel', fakeAsync(() => {        
        
        component.getSCIPRel(0, "yes");
        expect(component.results.length).toBe(1);
    }));


    it('should create', () => {
        expect(component).toBeTruthy();
    });
});


