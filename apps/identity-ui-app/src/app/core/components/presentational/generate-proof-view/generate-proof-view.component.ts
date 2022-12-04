import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dfn-identity-generate-proof-view',
  templateUrl: 'generate-proof-view.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateProofViewComponent {
  @Input() form: FormGroup;
  @Output() importKeys = new EventEmitter<Event>();
  @Output() downloadProof = new EventEmitter<void>();
}
