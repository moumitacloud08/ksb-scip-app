import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private localStorageService: LocalStorageService) { }

  canActivate(): boolean {
    console.log("Inside AuthGuardService")
    console.log( this.localStorageService.retrieve('user'))
    if (
      this.localStorageService.retrieve('user') &&
      this.localStorageService.retrieve('user').valid
    ) {
      console.log("Inside AuthGuardService TRUE")
      return true;
    }
    return false;
  }
}
