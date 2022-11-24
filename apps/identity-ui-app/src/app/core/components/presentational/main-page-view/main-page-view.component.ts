import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dfn-identity-main-page-view',
  templateUrl: 'main-page-view.component.html',
  styleUrls: ['main-page-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageViewComponent {
  @Output() previewContract = new EventEmitter<void>();
  @Output() createKeys = new EventEmitter<void>();
  @Output() generateProof = new EventEmitter<void>();
}
