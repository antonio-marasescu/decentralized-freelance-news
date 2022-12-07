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
  GetNewsArticleById,
  GetNewsArticleByIdSuccess,
  GetNewsArticleContentByAddress,
  GetNewsArticleContentByAddressSuccess,
  GetNewsSuccess,
  IdentityVerificationUpload,
  IdentityVerificationUploadSuccess,
  IncreaseNewsArticleRating,
  IncreaseNewsArticleRatingSuccess,
  SetupEthereumServices,
  SetupEthereumServicesSuccess,
  SetupIdentity,
  SetupIdentitySuccess,
} from './app.actions';
import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';
import { IdentityStorageClass } from '../types/identity-storage-class.types';
import { isNil } from 'lodash-es';

export interface AppState extends EntityState<INewsModel> {
  selectedArticleId: number | null;
  selectedArticleContent: Blob;
  currentAccount: string | null;
  loading: boolean;
  isInitialized: boolean;
  storedIdentity: string | null;
  storageClass: IdentityStorageClass;
  error: string;
}

export const getArticleId = (model: INewsModel) => model.index;
export const adapter: EntityAdapter<INewsModel> = createEntityAdapter<INewsModel>({
  selectId: getArticleId,
  sortComparer: (a, b) => b.index - a.index,
});

export const initialAppState: AppState = adapter.getInitialState({
  selectedArticleId: null,
  selectedArticleContent: null,
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
  on(GetNewsArticleById, (state) => ({ ...state, loading: true })),
  on(GetNewsArticleByIdSuccess, (state, { article }) =>
    adapter.addOne(article, { ...state, selectedArticleId: getArticleId(article), loading: false })
  ),
  on(GetNewsArticleContentByAddress, (state) => ({ ...state, loading: true })),
  on(GetNewsArticleContentByAddressSuccess, (state, { file }) => ({
    ...state,
    selectedArticleContent: file,
    loading: false,
  })),
  on(CreateNewsArticle, (state) => ({ ...state, loading: true })),
  on(CreateNewsArticleSuccess, (state) => ({ ...state, loading: false })),
  on(IncreaseNewsArticleRating, (state) => ({ ...state, loading: true })),
  on(IncreaseNewsArticleRatingSuccess, (state) => ({ ...state, loading: false })),
  on(AddNewsArticleSuccess, (state, { article }) => adapter.setOne(article, { ...state })),
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

const { selectEntities, selectAll } = adapter.getSelectors();

export const selectNews = () => createSelector(selectFeature(), selectAll);
export const selectNewsMap = () => createSelector(selectFeature(), selectEntities);
export const selectCurrentNewsArticle = () =>
  createSelector(selectFeature(), (state: AppState) =>
    !isNil(state.selectedArticleId) ? state.entities[state.selectedArticleId] : null
  );
export const selectCurrentNewsArticleContent = () =>
  createSelector(selectFeature(), (state: AppState) => state.selectedArticleContent);
