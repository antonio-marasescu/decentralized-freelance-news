import { Component, OnInit } from '@angular/core';
import { EthereumAdapterService } from '@decentralized-freelance-news/eth-contract-lib';

@Component({
  selector: 'dfn-main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private ethereumAdapterService: EthereumAdapterService) {}

  async ngOnInit(): Promise<void> {
    const value2 = await this.ethereumAdapterService.requestAccounts();
    const value1 = await this.ethereumAdapterService.requestVersion();
    console.log(value2, value1);
  }
}
