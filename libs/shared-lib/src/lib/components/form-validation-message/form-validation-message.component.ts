import { Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import {
  FormValidationError,
  FormValidationMessageConfiguration,
} from '../../types/form-validation.types';
import { map, Observable } from 'rxjs';
import { isNil } from 'lodash-es';

@Component({
  selector: 'shared-lib-form-validation-message',
  template: `<ng-container *ngIf="errors$">
    <mat-error *ngFor="let error of errors$ | async" [id]="error.errorKey">{{
      error.message
    }}</mat-error>
  </ng-container>`,
  styleUrls: [],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class FormValidationMessageComponent implements OnInit {
  @Input() controlName: string;
  @Input() configuration: FormValidationMessageConfiguration;

  errors$: Observable<FormValidationError[]>;
  formControl: AbstractControl;

  constructor(@Optional() private formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.formControl = this.formGroupDirective?.form?.get(this.controlName);
    if (!isNil(this.formControl)) {
      this.errors$ = this.formControl.statusChanges.pipe(
        map(() => {
          if (isNil(this.configuration) || isNil(this.formControl)) {
            return [];
          }
          const formErrors = this.formControl.errors ? Object.keys(this.formControl.errors) : [];
          return formErrors
            .map((errorCode) => this.configuration.get(errorCode))
            .filter((m) => !isNil(m));
        })
      );
    }
  }
}
