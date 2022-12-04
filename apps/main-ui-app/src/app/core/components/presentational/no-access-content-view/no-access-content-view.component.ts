import { Component } from '@angular/core';

@Component({
  selector: 'dfn-main-no-access-content-view',
  template: ` <div class="d-flex justify-content-center align-items-center vh-100 pt-4">
    <div class="container no-access-container">
      <div class="row">
        <div class="col-12 text-center">
          <mat-icon class="no-access-icon">sentiment_dissatisfied</mat-icon>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-12 text-center no-access-text">
          You need to provide access to your Ethereum account before accessing the content
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['no-access-content-view.component.scss'],
})
export class NoAccessContentViewComponent {}
