import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shared-lib-loading-overlay',
  template: `<div
    class="w-screen h-screen flex flex-column justify-content-center align-items-center"
    *ngIf="isLoading"
  >
    <div class="flex">
      <mat-progress-spinner color="primary"> </mat-progress-spinner>
    </div>
    <div class="flex pt-2 text-lg text-primary">Data is loading...</div>
  </div>`,
  styleUrls: ['loading-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOverlayComponent {
  @Input() isLoading = false;
}
