import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dfn-identity-register-form-view',
  templateUrl: 'register-form-view.component.html',
  styleUrls: ['register-form-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormViewComponent {
  @Input() form: FormGroup | undefined;
  @Output() register: EventEmitter<void> = new EventEmitter<void>();
  @Output() navigateLogin: EventEmitter<void> = new EventEmitter<void>();
}
