import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { INewsModel, NewsContentType } from '@decentralized-freelance-news/eth-contract-lib';

@Component({
  selector: 'dfn-main-news-article-view',
  templateUrl: 'news-article-view.component.html',
  styleUrls: ['news-article-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsArticleViewComponent {
  ContentType = NewsContentType;
  @Input() article: INewsModel;
  @Input() content: string;
}
