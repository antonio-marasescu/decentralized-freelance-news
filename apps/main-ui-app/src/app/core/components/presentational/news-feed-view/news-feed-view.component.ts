import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';

@Component({
  selector: 'dfn-main-news-feed-view',
  templateUrl: 'news-feed-view.component.html',
  styleUrls: ['news-feed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NewsFeedViewComponent {
  @Input() newsFeedList: INewsModel[] = [];
}
