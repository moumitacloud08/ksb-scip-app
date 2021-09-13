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
import { Message } from '../message.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: LoginService;
  beforeEach(() => {
    service = new LoginService(null,null);
    component = new LoginComponent(service, new UtilService(), null, null);
  });

  it('Test authenticate EqualTo', fakeAsync(() => {
    const testForm = <NgForm>{
      value: {
        tokenInput: '123456789',
      },
    };

    let message = [{ code: '200', type: 'String', message: 'Login Success' }];
    spyOn(service, 'login').and.returnValue(of([message]));
    component.authenticate(testForm);
    expect(component.messages.length).toBe(1);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
