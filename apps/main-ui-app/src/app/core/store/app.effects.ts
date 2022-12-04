import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  ActionFailure,
  GetCurrentAccount,
  GetCurrentAccountSuccess,
  RequestAccountsAccess,
  SetupEthereumServices,
  SetupEthereumServicesSuccess,
} from './app.actions';
import {
  DfnContractAdapterService,
  EthereumAdapterService,
} from '@decentralized-freelance-news/eth-contract-lib';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private ethereumAdapterService: EthereumAdapterService,
    private dfnContractAdapterService: DfnContractAdapterService
  ) {}

  getCurrentAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCurrentAccount),
      map(async () => {
        const account = await this.ethereumAdapterService.requestSignerAccount();
        return GetCurrentAccountSuccess({ account });
      }),
      switchMap((promise) => from(promise)),
      catchError((err) => of(ActionFailure({ reason: err, origin: 'GetCurrentAccount' })))
    )
  );

  getCurrentAccountSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCurrentAccountSuccess),
      map(() => SetupEthereumServices())
    )
  );

  requestAccountAccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestAccountsAccess),
      map(async () => {
        await this.ethereumAdapterService.requestAccounts();
        return SetupEthereumServices();
      }),
      switchMap((promise) => from(promise)),
      catchError((err) => of(ActionFailure({ reason: err, origin: 'RequestAccountsAccess' })))
    )
  );

  setupEthereumServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetupEthereumServices),
      map(async () => {
        const version = await this.ethereumAdapterService.requestVersion();
        const currentAccount = await this.ethereumAdapterService.requestSignerAccount();
        await this.dfnContractAdapterService.setupService(version);
        return SetupEthereumServicesSuccess({ currentAccount });
      }),
      switchMap((promise) => from(promise)),
      catchError((err) => of(ActionFailure({ reason: err, origin: 'SetupEthereumServices' })))
    )
  );
}
