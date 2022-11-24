import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shared-lib-loading-overlay',
  template: `<div class="loading-overlay-container" *ngIf="isLoading">
    <mat-progress-spinner color="primary" mode="indeterminate"></mat-progress-spinner>
  </div>`,
  styles: [
    `
      .loading-overlay-container {
        position: sticky;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOverlayComponent {
  @Input() isLoading = false;
}
