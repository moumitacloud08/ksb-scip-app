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
    function setResultData() {
        component.results = [{
            "lineItemNumber": "8890986",
            "statisticalGoodsNumber": "3454476",
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
            "statisticalGoodsNumber": "456547678",
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
            "statisticalGoodsNumber": "56756787",
            "purchaseOrderNumber": "9087876",
            "scipNumber": "1222234323",
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
        component.resultsTemp = Object.assign([], component.results);
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
        component.mouseEnter(parentIndex, "scip");
        expect(component.results[parentIndex].isSCIPEditShow).toBe(true);
        expect(component.results[parentIndex].isSCIPSpanShow).toBe(false);

        setResultData();
    }));

    it('isStatSpanShow to be false', fakeAsync(() => {

        component.mouseEnter(parentIndex, "stat");
        expect(component.results[parentIndex].isStatEditShow).toBe(true);
        expect(component.results[parentIndex].isStatSpanShow).toBe(false);

        setResultData();
    }));
    it('isCasSpanShow to be false', fakeAsync(() => {

        component.mouseEnter(parentIndex, "cas");
        expect(component.results[parentIndex].isCasEditShow).toBe(true);
        expect(component.results[parentIndex].isCasSpanShow).toBe(false);

        setResultData();
    }));
    it('isMatSpanShow to be false', fakeAsync(() => {

        component.mouseEnter(parentIndex, "mat");
        expect(component.results[parentIndex].isMatEditShow).toBe(true);
        expect(component.results[parentIndex].isMatSpanShow).toBe(false);
        setResultData();
    }));
    it('isSCIPEditShow to be false', fakeAsync(() => {

        component.mouseEnter(parentIndex, "test");
        expect(component.results[parentIndex].isSCIPEditShow).toBe(false);
        expect(component.results[parentIndex].isSCIPSpanShow).toBe(true);
        setResultData();
    }));
    it('test mouseLeave', fakeAsync(() => {

        component.mouseLeave(parentIndex);
        expect(component.results[parentIndex].isSCIPSpanShow).toBe(true);
        setResultData();
    }));
    it('test clickevent', fakeAsync(() => {

        component.clickevent(parentIndex);
        expect(component.results[parentIndex].isSCIPSpanShow).toBe(false);
        setResultData();
    }));


    it('test clearRowData', fakeAsync(() => {

        component.clearRowData(parentIndex);
        expect(component.results[parentIndex].scipNumber).toBe("");
        setResultData();
    }));

    it('validateScip: isInvalid to be true', fakeAsync(() => {

        component.validateScip(parentIndex);
        expect(component.results[parentIndex].isInvalid).toBe(true);
        setResultData();
    }));
    it('validateScip: isInvalid to be false', fakeAsync(() => {

        component.validateScip(2);
        expect(component.results[2].isInvalid).toBe(false);
        setResultData();
    }));
    it('validateStatGood: isStatGoodInvalid  to be true', fakeAsync(() => {
        component.validateStatGood(parentIndex);
        expect(component.results[parentIndex].isStatGoodInvalid).toBe(true);
        setResultData();
    }));
    it('validateStatGood: isStatGoodInvalid  to be false', fakeAsync(() => {
        component.validateStatGood(1);
        expect(component.results[parentIndex].isStatGoodInvalid).toBe(false);
        setResultData();
    }));
    it('test removeDuplicates', fakeAsync(() => {
        component.removeDuplicates(component.results, 'rowId');
        expect(component.results.length).toBe(3);
        setResultData();
    }));

    it('Test savePurchaseorderLine details', fakeAsync(() => {

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
        let spy = spyOn(service, 'savePurchaseorderLine').and.returnValue(Promise.resolve(data));
        component.results[parentIndex].statisticalGoodsNumber = "98665467"
        component.savePurchaseorderLine();
        expect(spy).toHaveBeenCalled();
    }));
    it('test editPurchaseorderLine', () => {

        component.editPurchaseorderLine(parentIndex, 0);
        expect(component.results.length).toBe(4);
        setResultData();
    });
    it('test editPurchaseorderLine for laST index', () => {

        component.editPurchaseorderLine(2, 1);
        expect(component.results.length).toBe(4);
        setResultData();
    });
    it('deleteRowIndex should be parentIndex', () => {
        
        component.getDeleteRowIndex(1);
        expect(component.deleteRowIndex).toBe(1);
        setResultData();
    });
    it('results length should be 2', () => {
        component.deleteRowIndex = 1
        component.deleteRow();
        expect(component.results.length).toBe(2);
        setResultData();
    });
    it('Test ClearAllTableData', () => {
        component.ClearAllTableData();
        expect(component.results[parentIndex].scipNumber).toBe("");
        setResultData();
    });
    it('Test SavePDF', () => {
       // component.generateHeaderForPDF();
        component.SavePDF();
        expect(component.generateDataForPDF().length).toBe(3);
        setResultData();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});


