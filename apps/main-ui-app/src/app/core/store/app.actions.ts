import { createAction, props } from '@ngrx/store';
import { IdentityStorageClass } from '../types/identity-storage-class.types';
import { INewsModel, INewsModelCreateDto } from '@decentralized-freelance-news/eth-contract-lib';

// contract interaction

export const GetNews = createAction('[DFN] Get News');
export const GetNewsSuccess = createAction(
  '[DFN] Get News Success',
  props<{ news: INewsModel[] }>()
);
export const GetNewsArticleById = createAction(
  '[DFN] Get News Article By Id',
  props<{ id: number }>()
);
export const GetNewsArticleByIdSuccess = createAction(
  '[DFN] Get News Article By Id Success',
  props<{ article: INewsModel }>()
);
export const GetNewsArticleContentByAddress = createAction(
  '[DFN] Get News Article Content By Address',
  props<{ address: string }>()
);
export const GetNewsArticleContentByAddressSuccess = createAction(
  '[DFN] Get News Article Content By Address Success',
  props<{ file: Blob }>()
);
export const CreateNewsArticle = createAction(
  '[DFN] Create News Article',
  props<{ article: INewsModelCreateDto }>()
);
export const CreateNewsArticleSuccess = createAction('[DFN] Create News Article Success');
export const AddNewsArticle = createAction(
  '[DFN] Add News Article',
  props<{ articleId: number }>()
);
export const AddNewsArticleSuccess = createAction(
  '[DFN] Add News Article Success',
  props<{ article: INewsModel }>()
);

// setup
export const GetCurrentAccount = createAction('[DFN] Get Current Account');
export const GetCurrentAccountSuccess = createAction(
  '[DFN] Get Current Account Success',
  props<{ account: string }>()
);
export const RequestAccountsAccess = createAction('[DFN] Request Accounts Access');
export const SetupEthereumServices = createAction('[DFN] Setup Ethereum Services');
export const SetupEthereumServicesSuccess = createAction(
  '[DFN] Setup Ethereum Services Success',
  props<{ currentAccount: string }>()
);

// identity verification
export const SetupIdentity = createAction('[DFN] Setup Identity');
export const SetupIdentitySuccess = createAction(
  '[DFN] Setup Identity Success',
  props<{ storageClass: IdentityStorageClass; storedIdentity: string | null }>()
);
export const ChangeStorageClass = createAction(
  '[DFN] Change Storage Class',
  props<{ newStorageClass: IdentityStorageClass }>()
);
export const ChangeStorageClassSuccess = createAction(
  '[DFN] Change Storage Class Success',
  props<{ storageClass: IdentityStorageClass; storedIdentity: string | null }>()
);
export const IdentityVerificationUpload = createAction(
  '[DFN] Identity Verification Upload',
  props<{ newStoredIdentity: string }>()
);
export const IdentityVerificationUploadSuccess = createAction(
  '[DFN] Identity Verification Upload Success',
  props<{ storedIdentity: string | null }>()
);

// errors
export const ActionFailure = createAction(
  '[DFN] Action Failure',
  props<{ reason: string; origin: string }>()
);
