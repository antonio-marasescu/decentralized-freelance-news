import { Injectable } from '@angular/core';
import { Web3ProviderService } from './web3-provider.service';
import { EtherCommandsUtils } from '../utils/ether-commands.utils';
import { EtherCommandsTypes } from '../types/ether-commands.types';
import { JsonRpcSigner } from '@ethersproject/providers/lib/json-rpc-provider';

@Injectable({ providedIn: 'root' })
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
    const accountsResponse = await EtherCommandsUtils.sendCommand(
      this.provider,
      EtherCommandsTypes.RequestNetworkVersion,
      []
    );
    return accountsResponse.result;
  }

  async requestSigner(): Promise<JsonRpcSigner> {
    return this.web3ProviderService.getSigner();
  }

  async requestSignerAccount(): Promise<string> {
    const signer = await this.web3ProviderService.getSigner();
    return signer.getAddress();
  }

  private get provider(): any {
    return this.web3ProviderService.provider;
  }
}
