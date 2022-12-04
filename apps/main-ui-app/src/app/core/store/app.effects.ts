import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  ActionFailure,
  ChangeStorageClass,
  ChangeStorageClassSuccess,
  GetCurrentAccount,
  GetCurrentAccountSuccess,
  IdentityVerificationUpload,
  IdentityVerificationUploadSuccess,
  RequestAccountsAccess,
  SetupEthereumServices,
  SetupEthereumServicesSuccess,
  SetupIdentity,
  SetupIdentitySuccess,
} from './app.actions';
import {
  DfnContractAdapterService,
  EthereumAdapterService,
} from '@decentralized-freelance-news/eth-contract-lib';
import { IdentityVerificationService } from '../services/identity-verification.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private ethereumAdapterService: EthereumAdapterService,
    private dfnContractAdapterService: DfnContractAdapterService,
    private identityVerificationService: IdentityVerificationService
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

  setupIdentity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetupIdentity),
      map(() => {
        const storageClass = this.identityVerificationService.storageClass;
        const storedIdentity = this.identityVerificationService.storedIdentity;
        return SetupIdentitySuccess({ storedIdentity, storageClass });
      }),
      catchError((err) => of(ActionFailure({ reason: err, origin: 'SetupIdentity' })))
    )
  );

  changeStorageClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangeStorageClass),
      map(({ newStorageClass }) => {
        this.identityVerificationService.storageClass = newStorageClass;
        const storedIdentity = this.identityVerificationService.storedIdentity;
        return ChangeStorageClassSuccess({ storedIdentity, storageClass: newStorageClass });
      }),
      catchError((err) => of(ActionFailure({ reason: err, origin: 'ChangeStorageClass' })))
    )
  );

  identityVerificationUpload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdentityVerificationUpload),
      map(({ newStoredIdentity }) => {
        this.identityVerificationService.storedIdentity = newStoredIdentity;
        const storedIdentity = this.identityVerificationService.storedIdentity;
        return IdentityVerificationUploadSuccess({ storedIdentity });
      }),
      catchError((err) => of(ActionFailure({ reason: err, origin: 'IdentityVerificationUpload' })))
    )
  );
}
