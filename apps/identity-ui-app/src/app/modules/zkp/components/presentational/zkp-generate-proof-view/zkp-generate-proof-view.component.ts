import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dfn-identity-zkp-generate-proof-view',
  templateUrl: 'zkp-generate-proof-view.component.html',
  styleUrls: ['zkp-generate-proof-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZkpGenerateProofViewComponent {
  @Input() form: FormGroup | undefined;
  @Output() downloadProof: EventEmitter<void> = new EventEmitter<void>();
}
