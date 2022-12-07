import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';

@Component({
  selector: 'dfn-main-news-feed-view',
  templateUrl: 'news-feed-view.component.html',
  styleUrls: ['news-feed-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedViewComponent {
  @Input() newsFeedList: INewsModel[] = [];
  @Input() hasIdentity = false;
  @Output() likeEvent = new EventEmitter<number>();
  @Output() readEvent = new EventEmitter<number>();
}
