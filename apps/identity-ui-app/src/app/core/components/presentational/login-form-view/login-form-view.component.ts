import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dfn-identity-login-form-view',
  templateUrl: 'login-form-view.component.html',
  styleUrls: ['login-form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormViewComponent {
  @Input() form: FormGroup | undefined;
  @Output() login: EventEmitter<void> = new EventEmitter<void>();
  @Output() navigateRegister: EventEmitter<void> = new EventEmitter<void>();
}
