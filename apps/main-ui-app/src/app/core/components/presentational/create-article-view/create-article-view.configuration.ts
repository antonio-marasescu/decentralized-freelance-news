import { FormValidationError } from '@decentralized-freelance-news/shared-lib';

export class CreateArticleViewConfiguration {
  static readonly configuration = {
    ipfsAddress: new Map<string, FormValidationError>([
      ['required', { errorKey: 'required', message: 'This field is required' }],
    ]),
    newsHash: new Map<string, FormValidationError>([
      ['required', { errorKey: 'required', message: 'This field is required' }],
    ]),
    title: new Map<string, FormValidationError>([
      ['required', { errorKey: 'required', message: 'This field is required' }],
    ]),
    summary: new Map<string, FormValidationError>([
      ['required', { errorKey: 'required', message: 'This field is required' }],
    ]),
    contentType: new Map<string, FormValidationError>([
      ['required', { errorKey: 'required', message: 'This field is required' }],
    ]),
  };
}
