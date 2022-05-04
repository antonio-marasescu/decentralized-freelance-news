import { createAction, props } from '@ngrx/store';
import {
  IdentityUserDto,
  IIdentityUserAccessTokenDto,
  IIdentityUserLoginDto,
  IIdentityUserRegisterDto,
} from '@decentralized-freelance-news/api-shared-lib';

export enum AppActions {
  GET_ALL_USERS = '[Users] Get All Users',
  GET_ALL_USERS_SUCCESS = '[Users] Get All Users Success',
  GET_CURRENT_USER = '[Users] Get Current',
  GET_CURRENT_USER_SUCCESS = '[Users] Get Current Success',
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  LOGOUT = '[Auth] Logout',
  ACTION_FAILURE = '[App] Action Failure',
}

export const GetAllUsers = createAction(AppActions.GET_ALL_USERS);
export const GetAllUsersSuccess = createAction(AppActions.GET_ALL_USERS_SUCCESS, props<{ users: IdentityUserDto[] }>());
export const GetCurrentUser = createAction(AppActions.GET_CURRENT_USER);
export const GetCurrentUserSuccess = createAction(
  AppActions.GET_CURRENT_USER_SUCCESS,
  props<{ user: IdentityUserDto }>()
);

export const Login = createAction(AppActions.LOGIN, props<{ payload: IIdentityUserLoginDto }>());
export const LoginSuccess = createAction(AppActions.LOGIN_SUCCESS, props<IIdentityUserAccessTokenDto>());
export const Register = createAction(AppActions.REGISTER, props<{ payload: IIdentityUserRegisterDto }>());
export const RegisterSuccess = createAction(AppActions.REGISTER_SUCCESS, props<{ user: IdentityUserDto }>());
export const Logout = createAction(AppActions.LOGOUT);

export const ActionFailure = createAction(AppActions.ACTION_FAILURE, props<{ reason: string; origin: string }>());
