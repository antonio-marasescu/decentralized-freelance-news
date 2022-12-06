import { createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionFailure,
  AddNewsArticleSuccess,
  ChangeStorageClass,
  ChangeStorageClassSuccess,
  CreateNewsArticle,
  CreateNewsArticleSuccess,
  GetCurrentAccount,
  GetCurrentAccountSuccess,
  GetNews,
  GetNewsSuccess,
  IdentityVerificationUpload,
  IdentityVerificationUploadSuccess,
  SetupEthereumServices,
  SetupEthereumServicesSuccess,
  SetupIdentity,
  SetupIdentitySuccess,
} from './app.actions';
import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';
import { IdentityStorageClass } from '../types/identity-storage-class.types';
import { values } from 'lodash-es';

export interface AppState extends EntityState<INewsModel> {
  selectedNews: number | null;
  currentAccount: string | null;
  loading: boolean;
  isInitialized: boolean;
  storedIdentity: string | null;
  storageClass: IdentityStorageClass;
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
  storedIdentity: null,
  storageClass: IdentityStorageClass.InMemory,
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
  on(SetupIdentity, (state) => ({
    ...state,
    loading: false,
  })),
  on(SetupIdentitySuccess, (state, { storageClass, storedIdentity }) => ({
    ...state,
    storageClass,
    storedIdentity,
    loading: false,
  })),
  on(ChangeStorageClass, (state) => ({ ...state, loading: true })),
  on(ChangeStorageClassSuccess, (state, { storedIdentity, storageClass }) => ({
    ...state,
    storageClass,
    storedIdentity,
    loading: false,
  })),
  on(IdentityVerificationUpload, (state) => ({ ...state, loading: true })),
  on(IdentityVerificationUploadSuccess, (state, { storedIdentity }) => ({
    ...state,
    storedIdentity,
    loading: false,
  })),
  on(GetNews, (state) => ({ ...state, loading: true })),
  on(GetNewsSuccess, (state, { news }) => adapter.setMany(news, { ...state, loading: false })),
  on(CreateNewsArticle, (state) => ({ ...state, loading: true })),
  on(CreateNewsArticleSuccess, (state) => ({ ...state, loading: false })),
  on(AddNewsArticleSuccess, (state, { article }) => adapter.addOne(article, { ...state })),
  on(ActionFailure, (state, { reason }) => ({ ...state, error: reason, loading: false }))
);

export const selectFeature = () => (state: { appState: AppState }) => state.appState;

export const selectCurrentAccount = () =>
  createSelector(selectFeature(), (state: AppState) => state.currentAccount);
export const selectIsLoading = () =>
  createSelector(selectFeature(), (state: AppState) => state.loading);
export const selectIsInitialized = () =>
  createSelector(selectFeature(), (state: AppState) => state.isInitialized);
export const selectStorageClass = () =>
  createSelector(selectFeature(), (state: AppState) => state.storageClass);
export const selectStoredIdentity = () =>
  createSelector(selectFeature(), (state: AppState) => state.storedIdentity);

export const selectNews = () =>
  createSelector(selectFeature(), (state: AppState) => values(state.entities));
export const selectNewsMap = () =>
  createSelector(selectFeature(), (state: AppState) => state.entities);
