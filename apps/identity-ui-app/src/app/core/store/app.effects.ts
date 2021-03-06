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
} from '../../modules/shared/store/app.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { IIdentityUserLoginDto, IIdentityUserRegisterDto } from '@decentralized-freelance-news/api-shared-lib';
import { AppRoutesConfig } from '../../modules/shared/configuration/app-routes.config';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private router: Router, private authService: AuthService) {}

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
          catchError((err) => of(ActionFailure({ reason: JSON.stringify(err), origin: AppActions.GET_CURRENT_USER })))
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
          catchError((err) => of(ActionFailure({ reason: JSON.stringify(err), origin: AppActions.LOGIN })))
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
          catchError((err) => of(ActionFailure({ reason: JSON.stringify(err), origin: AppActions.REGISTER })))
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
          await this.router.navigateByUrl(`${AppRoutesConfig.ZkpModule}`);
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
}
