import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DfnContractAdapterService } from '@decentralized-freelance-news/eth-contract-lib';

@Component({
  selector: 'dfn-main-news-list-container',
  template: `
    <button pButton (click)="addNews()">Add News</button>
    <button pButton (click)="readNews()">Read News</button>
    <dfn-main-news-list-view></dfn-main-news-list-view>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListContainerComponent {
  constructor(private dfnContractAdapterService: DfnContractAdapterService) {}

  async addNews(): Promise<void> {
    await this.dfnContractAdapterService.addNews({
      ipfsAddress: '1234',
      newsHash: '1234',
      title: 'News 01',
      summary: 'Some Large Text',
      contentType: 'text/plain',
    });
  }

  async readNews(): Promise<void> {
    const news = await this.dfnContractAdapterService.getNews();
    console.log(news);
  }
}
