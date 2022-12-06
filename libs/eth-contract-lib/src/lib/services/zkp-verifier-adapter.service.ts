import { Injectable } from '@angular/core';
import { Contract } from 'ethers';
import Verifier from 'truffle/abis/Verifier.json';
import { EthereumAdapterService } from './ethereum-adapter.service';
import { JsonRpcSigner } from '@ethersproject/providers/lib/json-rpc-provider';
import { IZkpProofDto } from '@decentralized-freelance-news/api-shared-lib';

@Injectable({ providedIn: 'root' })
export class ZkpVerifierAdapterService {
  private _contractNetworkAddress: string = null;
  private _contract: Contract = null;
  private _signer: JsonRpcSigner = null;

  constructor(private ethereumAdapterService: EthereumAdapterService) {}

  async setupService(networkVersion: string): Promise<void> {
    this._signer = await this.ethereumAdapterService.requestSigner();
    this._contractNetworkAddress = Verifier.networks[networkVersion].address;
    this._contract = new Contract(this._contractNetworkAddress, Verifier.abi, this._signer);
  }

  async verify(value: IZkpProofDto): Promise<boolean> {
    try {
      return await this._contract['verifyTx'](value.proof, value.inputs);
    } catch {
      return false;
    }
  }
}
