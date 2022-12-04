import { createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionFailure,
  GetCurrentAccount,
  GetCurrentAccountSuccess,
  SetupEthereumServices,
  SetupEthereumServicesSuccess,
} from './app.actions';
import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';

export interface AppState extends EntityState<INewsModel> {
  selectedNews: number | null;
  currentAccount: string | null;
  loading: boolean;
  isInitialized: boolean;
  error: string;
}
export const adapter: EntityAdapter<INewsModel> = createEntityAdapter<INewsModel>({
  selectId: (model) => model.index,
});

export const initialAppState: AppState = adapter.getInitialState({
  selectedNews: null,
  currentAccount: null,
  loading: false,
  isInitialized: false,
  error: null,
});

export const appReducer = createReducer(
  initialAppState,
  on(GetCurrentAccount, (state) => ({ ...state, loading: true })),
  on(GetCurrentAccountSuccess, (state, { account }) => ({
    ...state,
    currentAccount: account,
    loading: false,
  })),
  on(SetupEthereumServices, (state) => ({ ...state, isInitialized: false, loading: true })),
  on(SetupEthereumServicesSuccess, (state, { currentAccount }) => ({
    ...state,
    currentAccount,
    isInitialized: true,
    loading: false,
  })),
  on(ActionFailure, (state, { reason }) => ({ ...state, error: reason, loading: false }))
);

export const selectFeature = () => (state: { appState: AppState }) => state.appState;

export const selectCurrentAccount = () =>
  createSelector(selectFeature(), (state: AppState) => state.currentAccount);
export const selectIsLoading = () =>
  createSelector(selectFeature(), (state: AppState) => state.loading);
export const selectIsInitialized = () =>
  createSelector(selectFeature(), (state: AppState) => state.isInitialized);
