import { createAction, props } from '@ngrx/store';
import { IdentityStorageClass } from '../types/identity-storage-class.types';
import { INewsModel, INewsModelCreateDto } from '@decentralized-freelance-news/eth-contract-lib';

export enum AppActions {
  // setup
  GET_CURRENT_ACCOUNT = '[DFN] Get Current Account',
  GET_CURRENT_ACCOUNT_SUCCESS = '[DFN] Get Current Account Success',
  REQUEST_ACCOUNTS_ACCESS = '[DFN] Request Accounts Access',
  SETUP_ETHEREUM_SERVICES = '[DFN] Setup Ethereum Services',
  SETUP_ETHEREUM_SERVICES_SUCCESS = '[DFN] Setup Ethereum Services Success',

  // identity verification
  SETUP_IDENTITY = '[DFN] Setup Identity',
  SETUP_IDENTITY_SUCCESS = '[DFN] Setup Identity Success',
  CHANGE_STORAGE_CLASS = '[DFN] Change Storage Class',
  CHANGE_STORAGE_CLASS_SUCCESS = '[DFN] Change Storage Class Success',
  IDENTITY_VERIFICATION_UPLOAD = '[DFN] Identity Verification Upload',
  IDENTITY_VERIFICATION_UPLOAD_SUCCESS = '[DFN] Identity Verification Upload Success',

  // contract interaction
  GET_NEWS = '[DFN] Get News',
  GET_NEWS_SUCCESS = '[DFN] Get News Success',
  CREATE_NEWS_ARTICLE = '[DFN] Create News Article',
  CREATE_NEWS_ARTICLE_SUCCESS = '[DFN] Create News Article Success',
  ADD_NEWS_ARTICLE = '[DFN] Add News Article',
  ADD_NEWS_ARTICLE_Success = '[DFN] Add News Article Success',

  // errors
  ACTION_FAILURE = '[DFN] Action Failure',
}

// setup
export const GetCurrentAccount = createAction(AppActions.GET_CURRENT_ACCOUNT);
export const GetCurrentAccountSuccess = createAction(
  AppActions.GET_CURRENT_ACCOUNT_SUCCESS,
  props<{ account: string }>()
);
export const RequestAccountsAccess = createAction(AppActions.REQUEST_ACCOUNTS_ACCESS);
export const SetupEthereumServices = createAction(AppActions.SETUP_ETHEREUM_SERVICES);
export const SetupEthereumServicesSuccess = createAction(
  AppActions.SETUP_ETHEREUM_SERVICES_SUCCESS,
  props<{ currentAccount: string }>()
);

// identity verification
export const SetupIdentity = createAction(AppActions.SETUP_IDENTITY);
export const SetupIdentitySuccess = createAction(
  AppActions.SETUP_IDENTITY_SUCCESS,
  props<{ storageClass: IdentityStorageClass; storedIdentity: string | null }>()
);
export const ChangeStorageClass = createAction(
  AppActions.CHANGE_STORAGE_CLASS,
  props<{ newStorageClass: IdentityStorageClass }>()
);
export const ChangeStorageClassSuccess = createAction(
  AppActions.CHANGE_STORAGE_CLASS_SUCCESS,
  props<{ storageClass: IdentityStorageClass; storedIdentity: string | null }>()
);
export const IdentityVerificationUpload = createAction(
  AppActions.IDENTITY_VERIFICATION_UPLOAD,
  props<{ newStoredIdentity: string }>()
);
export const IdentityVerificationUploadSuccess = createAction(
  AppActions.IDENTITY_VERIFICATION_UPLOAD_SUCCESS,
  props<{ storedIdentity: string | null }>()
);

// contract interaction

export const GetNews = createAction(AppActions.GET_NEWS);
export const GetNewsSuccess = createAction(
  AppActions.GET_NEWS_SUCCESS,
  props<{ news: INewsModel[] }>()
);
export const CreateNewsArticle = createAction(
  AppActions.CREATE_NEWS_ARTICLE,
  props<{ article: INewsModelCreateDto }>()
);
export const CreateNewsArticleSuccess = createAction(AppActions.CREATE_NEWS_ARTICLE_SUCCESS);
export const AddNewsArticle = createAction(
  AppActions.ADD_NEWS_ARTICLE,
  props<{ articleId: number }>()
);
export const AddNewsArticleSuccess = createAction(
  AppActions.ADD_NEWS_ARTICLE_Success,
  props<{ article: INewsModel }>()
);

// errors
export const ActionFailure = createAction(
  AppActions.ACTION_FAILURE,
  props<{ reason: string; origin: string }>()
);
