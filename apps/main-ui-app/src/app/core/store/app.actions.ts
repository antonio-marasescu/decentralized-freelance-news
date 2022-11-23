import { createAction, props } from '@ngrx/store';

export enum AppActions {
  GET_CURRENT_ACCOUNT = '[DFN] Get Current Account',
  GET_CURRENT_ACCOUNT_SUCCESS = '[DFN] Get Current Account Success',
  SETUP_ETHEREUM_SERVICES = '[DFN] Setup Ethereum Services',
  SETUP_ETHEREUM_SERVICES_SUCCESS = '[DFN] Setup Ethereum Services Success',
  GET_NEWS = '[DFN] Get News',
  GET_NEWS_SUCCESS = '[DFN] Get News',
  ACTION_FAILURE = '[DFN] Action Failure',
}

export const GetCurrentAccount = createAction(AppActions.GET_CURRENT_ACCOUNT);
export const GetCurrentAccountSuccess = createAction(
  AppActions.GET_CURRENT_ACCOUNT_SUCCESS,
  props<{ account: string }>()
);
export const SetupEthereumServices = createAction(AppActions.SETUP_ETHEREUM_SERVICES);
export const SetupEthereumServicesSuccess = createAction(AppActions.SETUP_ETHEREUM_SERVICES_SUCCESS);
export const ActionFailure = createAction(AppActions.ACTION_FAILURE, props<{ reason: string; origin: string }>());
