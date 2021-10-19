import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    NgxWebstorageModule,
    LocalStorageService,
} from 'ngx-webstorage';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { HeaderService } from '../service/header.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateService, TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header.component';
import { LoginComponent } from '../login/login.component';
describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let localStorageService: LocalStorageService;
    let service: HeaderService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NgxWebstorageModule.forRoot(),
                RouterTestingModule.withRoutes([
                    { path: 'vendorplatform', component: LoginComponent },
                  ]),
                TranslateTestingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateFakeLoader
                    }
                })
            ],
            declarations: [HeaderComponent],
            providers: [LocalStorageService, TranslateService,]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(HeaderService);
        localStorageService = TestBed.inject(LocalStorageService);
        let store = { "app": "scip", "key": "6765", "lang": "en", "user": { authToken: 'a3NiOmtzYg==' }, "api_token": "123456789" }
        spyOn(localStorageService, 'retrieve').and.callFake((key) => { return store[key] });
        fixture.detectChanges();
    });
    it('fetchmailId EqualTo', fakeAsync(() => {
        spyOn(service, 'getPONum').and.returnValue("6765");
        spyOn(service, 'setAuthToken').and.returnValue("a3NiOmtzYg==");

        let email = "test@gmail.com";
        let spy = spyOn(service, 'fetchmailId').and.returnValue(Promise.resolve(email));


        component.fetchmailId();
        expect(spy).toHaveBeenCalled();
        //expect(component.emailId).toBe(email);
    }));

    it('Logout test', fakeAsync(() => {
        spyOn(localStorageService, 'clear').and.returnValue();
        component.logout();
       
        expect(component.lang).toBe("en");
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
