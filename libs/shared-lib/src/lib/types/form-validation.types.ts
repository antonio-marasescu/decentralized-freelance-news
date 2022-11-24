export interface FormValidationError {
  errorKey: string;
  message: string;
}

export type FormValidationMessageConfiguration = Map<string, FormValidationError>;
