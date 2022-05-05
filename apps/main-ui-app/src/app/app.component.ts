import { Component } from '@angular/core';
import { EthereumAdapterService, ZkpVerifierAdapterService } from '@decentralized-freelance-news/eth-contract-lib';
import { IZkpProofDto } from '@decentralized-freelance-news/api-shared-lib';
import { FileUtils } from '@decentralized-freelance-news/shared-lib';

@Component({
  selector: 'dfn-main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private ethereumAdapterService: EthereumAdapterService,
    private zkpVerifierAdapterService: ZkpVerifierAdapterService
  ) {}

  async ngOnInit(): Promise<void> {
    const accounts = await this.ethereumAdapterService.requestAccounts();
    const version = await this.ethereumAdapterService.requestVersion();
    await this.zkpVerifierAdapterService.setupService(version);
  }

  async onUploadFile(event): Promise<void> {
    const file: File = event.files[0];
    const zkpProof = await FileUtils.readFileContentAsJson<IZkpProofDto>(file);

    const response1 = await this.zkpVerifierAdapterService.verify(zkpProof);
    console.log(response1);
  }
}
