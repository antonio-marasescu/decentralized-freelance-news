import { Component } from '@angular/core';
import { EthereumAdapterService, ZkpVerifierAdapterService } from '@decentralized-freelance-news/eth-contract-lib';
import { IZkpProofDto } from '@decentralized-freelance-news/api-shared-lib';
import { FileUtils } from '@decentralized-freelance-news/shared-lib';
import { DfnContractAdapterService } from '../../../../libs/eth-contract-lib/src/lib/services/dfn-contract-adapter.service';

@Component({
  selector: 'dfn-main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private ethereumAdapterService: EthereumAdapterService,
    private zkpVerifierAdapterService: ZkpVerifierAdapterService,
    private dfnContractAdapterService: DfnContractAdapterService
  ) {}

  async ngOnInit(): Promise<void> {
    const accounts = await this.ethereumAdapterService.requestAccounts();
    const version = await this.ethereumAdapterService.requestVersion();
    await this.zkpVerifierAdapterService.setupService(version);
    await this.dfnContractAdapterService.setupService(version);
  }

  async onCreateNews(): Promise<void> {
    await this.dfnContractAdapterService.addNews({
      ipfsAddress: '1234',
      newsHash: 'thah',
      title: 'The News01',
      summary: 'I am news',
    });
  }

  async onReadNews(): Promise<void> {
    const resp2 = await this.dfnContractAdapterService.getNewsByIndex(0);
    console.log(resp2);

    const resp3 = await this.dfnContractAdapterService.getNews();
    console.log(resp3);
  }

  async onUploadFile(event): Promise<void> {
    const file: File = event.files[0];
    const zkpProof = await FileUtils.readFileContentAsJson<IZkpProofDto>(file);

    const response1 = await this.zkpVerifierAdapterService.verify(zkpProof);
    console.log(response1);
  }
}
