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
    let parentIndex = 0;
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
    function setResultData(){
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
        },
        {
            "lineItemNumber": "7687687",
            "statisticalGoodsNumber": "34544765",
            "purchaseOrderNumber": "876667676",
            "scipNumber": "3454656",
            "scipRelavent": "false",
            "materialCategory": "Iron",
            "submitStatus": "Yes",
            "casnumber": "3455555",
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
        },
        {
            "lineItemNumber": "79898",
            "statisticalGoodsNumber": "5675678",
            "purchaseOrderNumber": "9087876",
            "scipNumber": "122222222",
            "scipRelavent": "false",
            "materialCategory": "Iron",
            "submitStatus": "Yes",
            "casnumber": "77765654",
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
    }
    beforeEach(() => {
        fixture = TestBed.createComponent(PurchaseOrderLineItemComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(PurchaseOrderLineItemService);
        localStorageService = TestBed.inject(LocalStorageService);
        spyOn(localStorageService, 'clear').and.returnValue();
        //spyOn(localStorageService, 'store').and.returnValue("6765");
        let store = { "app": "scip", "key": "6765", "lang": "en", "user": { authToken: 'a3NiOmtzYg==' }, "api_token": "123456789" }
        spyOn(localStorageService, 'retrieve').and.callFake((key) => { return store[key] });
        setResultData();
       
        component.page = 1
        component.activeParentIndex = 2
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
        expect(component.results.length).toBe(3);
    }));
    it('Test onTableSizeChange', fakeAsync(() => {
        var event: any
        event = { target: { value: 10 } }
        component.onTableSizeChange(event);
        expect(component.page).toBe(1);
    }));
    it('scipRelavent to be yes', fakeAsync(() => {        
        
        component.getSCIPRel(0, "yes");
        expect(component.results[parentIndex].scipRelavent).toBe("yes");
    }));
    it('SCIP to be blank', fakeAsync(() => {        
        
        component.clearSCIPData(parentIndex);
        expect(component.results[parentIndex].scipNumber).toBe("");
        setResultData();
    }));
    it('statisticalGoodsNumber to be blank', fakeAsync(() => {
        component.clearStatisticalData(parentIndex);
        expect(component.results[parentIndex].statisticalGoodsNumber).toBe("");
        setResultData();
    }));
    it('casnumber to be blank', fakeAsync(() => {
        component.clearCasNum(parentIndex);
        expect(component.results[parentIndex].casnumber).toBe("");
        setResultData();
    }));
    it('materialCategory to be blank', fakeAsync(() => {
        component.clearMatCat(parentIndex);
        expect(component.results[parentIndex].materialCategory).toBe("");
        setResultData();
    }));
    it('isSCIPEditShow to be false', fakeAsync(() => {
        component.mouseEnter(parentIndex,"scip");
        expect(component.results[parentIndex].isSCIPEditShow).toBe(true);
        expect(component.results[parentIndex].isSCIPSpanShow).toBe(false);

        setResultData();
    }));

    it('isStatSpanShow to be false', fakeAsync(() => {      

        component.mouseEnter(parentIndex,"stat");
        expect(component.results[parentIndex].isStatEditShow).toBe(true);
        expect(component.results[parentIndex].isStatSpanShow).toBe(false);

        setResultData();
    }));
    it('isCasSpanShow to be false', fakeAsync(() => {      

        component.mouseEnter(parentIndex,"cas");
        expect(component.results[parentIndex].isCasEditShow).toBe(true);
        expect(component.results[parentIndex].isCasSpanShow).toBe(false);

        setResultData();
    }));
    
    

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});


