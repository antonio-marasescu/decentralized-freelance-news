import { Injectable } from '@angular/core';
import { Web3ProviderService } from '@decentralized-freelance-news/eth-contract-lib';
import { EtherCommandsUtils } from '../utils/ether-commands.utils';
import { EtherCommandsTypes } from '../types/ether-commands.types';

@Injectable({ providedIn: 'any' })
export class EthereumAdapterService {
  constructor(private web3ProviderService: Web3ProviderService) {}

  async requestAccounts(): Promise<string[]> {
    const accountsResponse = await EtherCommandsUtils.sendCommand(
      this.provider,
      EtherCommandsTypes.RequestAccounts,
      []
    );
    return accountsResponse.result;
  }

  async requestVersion(): Promise<string> {
    const accountsResponse = await EtherCommandsUtils.sendCommand(this.provider, EtherCommandsTypes.RequestVersion, []);
    return accountsResponse.result;
  }

  private get provider(): any {
    return this.web3ProviderService.provider;
  }
}
