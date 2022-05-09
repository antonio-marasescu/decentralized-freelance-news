import { Injectable } from '@angular/core';
import { Contract } from 'ethers';
import { JsonRpcSigner } from '@ethersproject/providers/lib/json-rpc-provider';
import { ReplaySubject } from 'rxjs';
import { INewsModel, INewsModelCreateDto } from '../types/dfn-contract.types';
import { EthereumAdapterService } from './ethereum-adapter.service';
import { DfnEventTypes } from '../types/dfn-contract-events.types';
import NewsShareContract from 'truffle/abis/NewsShareContract.json';

@Injectable({ providedIn: 'any' })
export class DfnContractAdapterService {
  private _contractNetworkAddress: string = null;
  private _contract: Contract = null;
  private _signer: JsonRpcSigner = null;
  newsAddedEvent: ReplaySubject<INewsModel> = new ReplaySubject<INewsModel>();

  constructor(private ethereumAdapterService: EthereumAdapterService) {}

  async setupService(networkVersion: string): Promise<void> {
    this._signer = await this.ethereumAdapterService.requestSigner();
    this._contractNetworkAddress = NewsShareContract.networks[networkVersion].address;
    this._contract = new Contract(this._contractNetworkAddress, NewsShareContract.abi, this._signer);
    this._contract.on(DfnEventTypes.NewsAdded, (data) => this.newsAddedEvent.next(data));
  }

  async addNews(payload: INewsModelCreateDto): Promise<void> {
    await this._contract['addNews'](payload.ipfsAddress, payload.newsHash, payload.title, payload.summary);
  }

  async getNewsByIndex(index: number): Promise<Array<INewsModel>> {
    return this._contract['newsAddresses'](index);
  }

  async getNews(): Promise<Array<INewsModel>> {
    return this._contract['getNews']();
  }

  async getNewsPaginated(page: number, pagination: number): Promise<Array<INewsModel>> {
    return this._contract['getNewsPaginated'](page, pagination);
  }
}
