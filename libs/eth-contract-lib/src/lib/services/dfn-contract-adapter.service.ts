import { Injectable } from '@angular/core';
import { Contract } from 'ethers';
import { JsonRpcSigner } from '@ethersproject/providers/lib/json-rpc-provider';
import { Subject } from 'rxjs';
import {
  INewsContractResponse,
  INewsModel,
  INewsModelCreateDto,
} from '../types/dfn-contract.types';
import { EthereumAdapterService } from './ethereum-adapter.service';
import { DfnEventTypes } from '../types/dfn-contract-events.types';
import NewsShareContract from 'truffle/abis/NewsShareContract.json';
import BigNumber from 'bignumber.js';
import { Web3ProviderService } from './web3-provider.service';

@Injectable({ providedIn: 'root' })
export class DfnContractAdapterService {
  private _contractNetworkAddress: string = null;
  private _contract: Contract = null;
  private _signer: JsonRpcSigner = null;
  newsAddedEvent: Subject<number> = new Subject<number>();

  private static mapToNewsModel(contractNews: INewsContractResponse): INewsModel {
    return {
      index: contractNews.index.toNumber(),
      title: contractNews.title,
      newsHash: contractNews.newsHash,
      ipfsAddress: contractNews.ipfsAddress,
      summary: contractNews.summary,
      contentType: contractNews.contentType,
      rating: contractNews.rating.toNumber(),
      owner: contractNews.owner,
    } as INewsModel;
  }

  constructor(
    private ethereumAdapterService: EthereumAdapterService,
    private web3ProviderService: Web3ProviderService
  ) {}

  async setupService(networkVersion: string): Promise<void> {
    this._signer = await this.ethereumAdapterService.requestSigner();
    this._contractNetworkAddress = NewsShareContract.networks[networkVersion].address;
    this._contract = new Contract(
      this._contractNetworkAddress,
      NewsShareContract.abi,
      this._signer
    );

    // only subscribe to events after the last block https://github.com/ethers-io/ethers.js/issues/2310
    this.web3ProviderService.once('block', () => {
      this._contract.on(DfnEventTypes.NewsAdded, (data: BigNumber) => {
        this.newsAddedEvent.next(data.toNumber());
      });
    });
  }

  async addNews(payload: INewsModelCreateDto): Promise<void> {
    await this._contract['addNews'](
      payload.ipfsAddress,
      payload.newsHash,
      payload.title,
      payload.summary,
      payload.contentType
    );
  }

  async getNewsByIndex(index: number): Promise<INewsModel> {
    const contractNews: INewsContractResponse = await this._contract['getNewsByIndex'](index);
    return DfnContractAdapterService.mapToNewsModel(contractNews);
  }

  async getNews(): Promise<Array<INewsModel>> {
    const contractNewsList: Array<INewsContractResponse> = await this._contract['getNews']();
    return contractNewsList.map((contractNews) =>
      DfnContractAdapterService.mapToNewsModel(contractNews)
    );
  }
}
