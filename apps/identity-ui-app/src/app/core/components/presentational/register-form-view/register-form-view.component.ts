import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormViewConfiguration } from '../login-form-view/login-form-view.configuration';

@Component({
  selector: 'dfn-identity-register-form-view',
  templateUrl: 'register-form-view.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormViewComponent {
  configuration = LoginFormViewConfiguration.configuration;
  @Input() form: FormGroup | undefined;
  @Output() register: EventEmitter<void> = new EventEmitter<void>();
  @Output() navigateLogin: EventEmitter<void> = new EventEmitter<void>();
}
