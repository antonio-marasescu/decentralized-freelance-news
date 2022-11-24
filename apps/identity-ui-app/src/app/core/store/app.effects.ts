import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  ActionFailure,
  AppActions,
  GetCurrentUser,
  GetCurrentUserSuccess,
  Login,
  LoginSuccess,
  Logout,
  Register,
  RegisterSuccess,
} from './app.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import {
  IIdentityUserLoginDto,
  IIdentityUserRegisterDto,
} from '@decentralized-freelance-news/api-shared-lib';
import { AppRoutesConfig } from '../types/configuration/app-routes.config';
import jwtDecode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  getCurrentUser = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCurrentUser),
      map(() => {
        const jwtToken = localStorage.getItem('authorization');
        const decodedToken: { username: string } = jwtDecode(jwtToken.toString());
        return decodedToken.username;
      }),
      mergeMap((username) =>
        this.authService.getUserByUsername(username).pipe(
          map((user) => GetCurrentUserSuccess({ user })),
          catchError((err) =>
            of(ActionFailure({ reason: JSON.stringify(err), origin: AppActions.GET_CURRENT_USER }))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Login),
      mergeMap((action: { payload: IIdentityUserLoginDto }) =>
        this.authService.login(action.payload).pipe(
          map((payload) => LoginSuccess(payload)),
          catchError(() =>
            of(ActionFailure({ reason: 'Invalid credentials', origin: AppActions.LOGIN }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Register),
      mergeMap((action: { payload: IIdentityUserRegisterDto }) =>
        this.authService.register(action.payload).pipe(
          map((user) => RegisterSuccess({ user })),
          catchError(() =>
            of(ActionFailure({ reason: 'Invalid credentials', origin: AppActions.REGISTER }))
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RegisterSuccess),
        tap(async () => {
          await this.router.navigateByUrl(`${AppRoutesConfig.LoginPage}`);
        })
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginSuccess),
        tap(async (action: { access_token: string }) => {
          localStorage.setItem('authorization', action.access_token);
          await this.router.navigateByUrl(`${AppRoutesConfig.LandingPage}`);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Logout),
        mergeMap(() =>
          this.authService.logout().pipe(
            tap(async () => {
              await this.router.navigateByUrl(`${AppRoutesConfig.LoginPage}`);
            })
          )
        )
      ),
    { dispatch: false }
  );

  actionFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionFailure),
        tap(({ reason }) => {
          this.snackBar.open(reason, 'Ok', { duration: 5000 });
        })
      ),
    { dispatch: false }
  );
}
