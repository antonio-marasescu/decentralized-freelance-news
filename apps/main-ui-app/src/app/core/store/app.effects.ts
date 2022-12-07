import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { from, of, tap } from 'rxjs';
import {
  ActionFailure,
  AddNewsArticle,
  AddNewsArticleSuccess,
  ChangeStorageClass,
  ChangeStorageClassSuccess,
  CreateNewsArticle,
  CreateNewsArticleSuccess,
  GetCurrentAccount,
  GetCurrentAccountSuccess,
  GetNews,
  GetNewsArticleById,
  GetNewsArticleByIdSuccess,
  GetNewsArticleContentByAddress,
  GetNewsArticleContentByAddressSuccess,
  GetNewsSuccess,
  IdentityVerificationUpload,
  IdentityVerificationUploadSuccess,
  IncreaseNewsArticleRating,
  IncreaseNewsArticleRatingSuccess,
  RequestAccountsAccess,
  SetupEthereumServices,
  SetupEthereumServicesSuccess,
  SetupIdentity,
  SetupIdentitySuccess,
} from './app.actions';
import {
  DfnContractAdapterService,
  EthereumAdapterService,
  IpfsAdapterService,
} from '@decentralized-freelance-news/eth-contract-lib';
import { IdentityVerificationService } from '../services/identity-verification.service';
import { AppRoutingService } from '../services/app-routing.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private ethereumAdapterService: EthereumAdapterService,
    private dfnContractAdapterService: DfnContractAdapterService,
    private identityVerificationService: IdentityVerificationService,
    private ipfsAdapterService: IpfsAdapterService,
    private appRoutingService: AppRoutingService,
    private snackBarRef: MatSnackBar
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

  getNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetNews),
      switchMap(() =>
        from(this.dfnContractAdapterService.getNews()).pipe(
          map((news) => GetNewsSuccess({ news })),
          catchError((err) => of(ActionFailure({ reason: err, origin: 'GetNews' })))
        )
      )
    )
  );

  getNewsArticleById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetNewsArticleById),
      switchMap(({ id }) =>
        from(this.dfnContractAdapterService.getNewsByIndex(id)).pipe(
          map((article) => GetNewsArticleByIdSuccess({ article })),
          catchError((err) => of(ActionFailure({ reason: err, origin: 'GetNewsArticleById' })))
        )
      )
    )
  );

  getNewsArticleByIdSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetNewsArticleByIdSuccess),
      map(({ article }) => GetNewsArticleContentByAddress({ address: article.ipfsAddress }))
    )
  );

  getNewsArticleContentByAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetNewsArticleContentByAddress),
      switchMap(({ address }) =>
        from(this.ipfsAdapterService.getFile(address)).pipe(
          map((file) => GetNewsArticleContentByAddressSuccess({ file })),
          catchError((err) =>
            of(ActionFailure({ reason: err, origin: 'GetNewsArticleContentByAddress' }))
          )
        )
      )
    )
  );

  createNewsArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateNewsArticle),
      switchMap(({ article }) => {
        return from(this.dfnContractAdapterService.addNews(article)).pipe(
          map(() => CreateNewsArticleSuccess()),
          catchError((err) => of(ActionFailure({ reason: err, origin: 'CreateNewsArticle' })))
        );
      })
    )
  );

  createNewsArticleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateNewsArticleSuccess),
        tap(() =>
          this.snackBarRef.open(
            'The article will be added to the blockchain with the next block.',
            'OK',
            {
              duration: 4000,
              panelClass: ['background-colored-snackbar'],
            }
          )
        ),
        switchMap(() => from(this.appRoutingService.navigateToNewsFeedPage()))
      ),
    { dispatch: false }
  );

  increaseNewsArticleRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IncreaseNewsArticleRating),
      switchMap(({ articleId, amount }) => {
        return from(this.dfnContractAdapterService.increaseRating(articleId, amount)).pipe(
          map(() => IncreaseNewsArticleRatingSuccess()),
          catchError((err) =>
            of(ActionFailure({ reason: err, origin: 'IncreaseNewsArticleRating' }))
          )
        );
      })
    )
  );

  increaseNewsArticleRatingSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IncreaseNewsArticleRatingSuccess),
        tap(() =>
          this.snackBarRef.open(
            'The article rating will be updated as soon the next block is published.',
            'OK',
            {
              duration: 4000,
              panelClass: ['background-colored-snackbar'],
            }
          )
        )
      ),
    { dispatch: false }
  );

  addNewsArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddNewsArticle),
      mergeMap(({ articleId }) => {
        return from(this.dfnContractAdapterService.getNewsByIndex(articleId)).pipe(
          map((article) => AddNewsArticleSuccess({ article })),
          catchError((err) => of(ActionFailure({ reason: err, origin: 'AddNewsArticle' })))
        );
      })
    )
  );
}
