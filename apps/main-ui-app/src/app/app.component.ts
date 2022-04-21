import { Component, OnInit } from '@angular/core';
import { EthereumAdapterService, ZkpVerifierAdapterService } from '@decentralized-freelance-news/eth-contract-lib';
import ProofData from 'zkp/dist/proof.json';
import { ZkpProof } from '../../../../libs/eth-contract-lib/src/lib/types/zkp-verification.types';

@Component({
  selector: 'dfn-main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private ethereumAdapterService: EthereumAdapterService,
    private zkpVerifierAdapterService: ZkpVerifierAdapterService
  ) {}

  async ngOnInit(): Promise<void> {
    const accounts = await this.ethereumAdapterService.requestAccounts();
    const version = await this.ethereumAdapterService.requestVersion();
    await this.zkpVerifierAdapterService.setupService(version);

    const response1 = await this.zkpVerifierAdapterService.verify(ProofData as ZkpProof);

    console.log(response1);
  }
}
