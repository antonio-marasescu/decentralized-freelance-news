import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-main-news-list-view',
  templateUrl: 'news-list-view.component.html',
  styleUrls: ['news-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListViewComponent {}
