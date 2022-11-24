import { FormValidationError } from '@decentralized-freelance-news/shared-lib';

export class RegisterFormViewConfiguration {
  static readonly configuration = {
    username: new Map<string, FormValidationError>([
      ['required', { errorKey: 'required', message: 'This field is required' }],
      ['email', { errorKey: 'email', message: 'This field requires an email format' }],
    ]),
    password: new Map<string, FormValidationError>([
      ['required', { errorKey: 'required', message: 'This field is required' }],
    ]),
  };
}
