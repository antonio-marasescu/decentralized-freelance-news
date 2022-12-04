import { Component } from '@angular/core';

@Component({
  selector: 'dfn-main-news-identity-page',
  template: ` <div class="news-identity-page-container">
    <div class="news-identity-container">
      <dfn-main-identity-verification-container></dfn-main-identity-verification-container>
    </div>
    <div class="account-and-filters-container">
      <dfn-main-account-management-container></dfn-main-account-management-container>
    </div>
  </div>`,
  styleUrls: ['news-identity-page.component.scss'],
})
export class NewsIdentityPageComponent {}
