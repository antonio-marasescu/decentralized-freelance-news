import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormViewConfiguration } from './login-form-view.configuration';

@Component({
  selector: 'dfn-identity-login-form-view',
  templateUrl: 'login-form-view.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormViewComponent {
  configuration = LoginFormViewConfiguration.configuration;
  @Input() form: FormGroup | undefined;
  @Output() login: EventEmitter<void> = new EventEmitter<void>();
  @Output() navigateRegister: EventEmitter<void> = new EventEmitter<void>();
}
