import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';

@Component({
  selector: 'dfn-main-news-feed-container',
  template: `<dfn-main-news-feed-view [newsFeedList]="items"></dfn-main-news-feed-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedContainerComponent {
  items: INewsModel[] = [
    {
      index: 1,
      ipfsAddress: 'Test',
      newsHash: 'test',
      title: 'Elon Musk Buys Twitter',
      summary:
        'Another ne news aAnothen Musk Another news a news aAnon MskAnother news about Elon MuskAnother news about Elon Musk',
      contentType: 'text/plain',
      rating: 2,
      owner: 'agahwhwatthaahw',
    },
    {
      index: 2,
      ipfsAddress: 'Test 2',
      newsHash: 'test 2',
      title: 'Elon Musk Doge Pump',
      summary: 'Another news about Elon Musk',
      contentType: 'text/plain',
      rating: 4,
      owner: 'agahwhwatthaahw',
    },
    {
      index: 3,
      ipfsAddress: 'Test',
      newsHash: 'test',
      title: 'Elon Musk Buys Twitter',
      summary: 'Another news about Elon Musk',
      contentType: 'text/plain',
      rating: 2,
      owner: 'agahwhwatthaahw',
    },
    {
      index: 4,
      ipfsAddress: 'Test 2',
      newsHash: 'test 2',
      title: 'Elon Musk Doge Pump',
      summary: 'Another news about Elon Musk',
      contentType: 'text/plain',
      rating: 4,
      owner: 'agahwhwatthaahw',
    },
    {
      index: 5,
      ipfsAddress: 'Test',
      newsHash: 'test',
      title: 'Elon Musk Buys Twitter',
      summary: 'Another news about Elon Musk',
      contentType: 'text/plain',
      rating: 2,
      owner: 'agahwhwatthaahw',
    },
    {
      index: 6,
      ipfsAddress: 'Test 2',
      newsHash: 'test 2',
      title: 'Elon Musk Doge Pump',
      summary: 'Another news about Elon Musk',
      contentType: 'text/plain',
      rating: 4,
      owner: 'agahwhwatthaahw',
    },
  ];
}
