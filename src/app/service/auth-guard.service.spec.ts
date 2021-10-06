import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import {
    NgxWebstorageModule,
    LocalStorageService,
} from 'ngx-webstorage';
import { RouterTestingModule } from "@angular/router/testing";

describe('AuthGuardService', () => {
    let service: AuthGuardService;
    let localStorageService: LocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxWebstorageModule.forRoot(),
                RouterTestingModule,
            ],
            providers: [LocalStorageService]
        });
        localStorageService = TestBed.inject(LocalStorageService);
       
        service = TestBed.inject(AuthGuardService);
    });
    it('Test canActive tobe true', () => {
        let store = { "app": "scip", "key": "6765", "lang": "en", "user": { authToken: 'a3NiOmtzYg==' ,valid:true}, "api_token": "123456789" }
        spyOn(localStorageService, 'retrieve').and.callFake((key) => { return store[key] });
        let isActive = service.canActivate()
        expect(isActive).toBe(true);
      });
      it('Test canActive tobe false', () => {
        let store = { "app": "scip", "key": "6765", "lang": "en", "user": { authToken: 'a3NiOmtzYg==' ,valid:false}, "api_token": "123456789" }
        spyOn(localStorageService, 'retrieve').and.callFake((key) => { return store[key] });
        let isActive = service.canActivate()
        expect(isActive).toBe(false);
      });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
