import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-main-news-feed-page',
  template: `
    <div class="d-flex justify-content-center align-items-center">
      <dfn-main-news-feed-container></dfn-main-news-feed-container>
    </div>
  `,
  styleUrls: ['news-feed-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedPageComponent {}
