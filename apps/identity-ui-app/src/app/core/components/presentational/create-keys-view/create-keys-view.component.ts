import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dfn-identity-create-keys-view',
  templateUrl: 'create-keys-view.component.html',
  styleUrls: ['create-keys-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateKeysViewComponent {
  @Input() form: FormGroup;
  @Input() downloadEnabled = false;
  @Output() createKeys: EventEmitter<void> = new EventEmitter<void>();
  @Output() downloadKeys: EventEmitter<void> = new EventEmitter<void>();
}
