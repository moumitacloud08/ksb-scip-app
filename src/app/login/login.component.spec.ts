import {
  inject,
  tick,
  TestBed,
  getTestBed,
  async,
  fakeAsync,
  ComponentFixture,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { UtilService } from '../util.service';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: LoginService;
  beforeEach(() => {
    service = new LoginService(null);
    component = new LoginComponent(service, new UtilService(), null, null);
    
  });

  it('true should be true ', () => {
    expect(true).toBe(true);
  });
  
  it('Test authenticate', fakeAsync(() => {
    const testForm = <NgForm>{
        value: {
          tokenInput: '123456789',
        },
      };
    const spy = spyOn(service, 'login').and.returnValue(of([1, 2, 3]));
    component.authenticate(testForm);
    expect(spy).toHaveBeenCalled()
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
