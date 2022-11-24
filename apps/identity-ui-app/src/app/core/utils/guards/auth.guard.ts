import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isNil } from 'lodash-es';
import { AppRoutesConfig } from '../../types/configuration/app-routes.config';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (isNil(localStorage.getItem('authorization'))) {
      await this.router.navigate([AppRoutesConfig.LoginPage]);
      return false;
    }
    return true;
  }
}
