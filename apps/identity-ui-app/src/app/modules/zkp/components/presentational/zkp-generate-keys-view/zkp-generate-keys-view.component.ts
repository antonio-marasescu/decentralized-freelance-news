import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dfn-identity-zkp-generate-keys-view',
  templateUrl: `zkp-generate-keys-view.component.html`,
  styleUrls: ['zkp-generate-keys-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZkpGenerateKeysViewComponent {
  @Input() form: FormGroup | undefined;
  @Input() isDownloadable = false;
  @Output() generateKeys: EventEmitter<void> = new EventEmitter<void>();
  @Output() downloadKeys: EventEmitter<void> = new EventEmitter<void>();
}
