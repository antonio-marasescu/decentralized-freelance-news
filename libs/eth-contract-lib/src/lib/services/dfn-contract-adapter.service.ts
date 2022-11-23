import { Injectable } from '@angular/core';
import { Contract } from 'ethers';
import { JsonRpcSigner } from '@ethersproject/providers/lib/json-rpc-provider';
import { ReplaySubject } from 'rxjs';
import { INewsContractResponse, INewsModel, INewsModelCreateDto } from '../types/dfn-contract.types';
import { EthereumAdapterService } from './ethereum-adapter.service';
import { DfnEventTypes } from '../types/dfn-contract-events.types';
import NewsShareContract from 'truffle/abis/NewsShareContract.json';

@Injectable({ providedIn: 'any' })
export class DfnContractAdapterService {
  private _contractNetworkAddress: string = null;
  private _contract: Contract = null;
  private _signer: JsonRpcSigner = null;
  newsAddedEvent: ReplaySubject<INewsModel> = new ReplaySubject<INewsModel>();

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

  constructor(private ethereumAdapterService: EthereumAdapterService) {}

  async setupService(networkVersion: string): Promise<void> {
    this._signer = await this.ethereumAdapterService.requestSigner();
    this._contractNetworkAddress = NewsShareContract.networks[networkVersion].address;
    this._contract = new Contract(this._contractNetworkAddress, NewsShareContract.abi, this._signer);
    this._contract.on(DfnEventTypes.NewsAdded, (data) => this.newsAddedEvent.next(data));
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
    const contractNews: INewsContractResponse = await this._contract['newsAddresses'](index);
    return DfnContractAdapterService.mapToNewsModel(contractNews);
  }

  async getNews(): Promise<Array<INewsModel>> {
    const contractNewsList: Array<INewsContractResponse> = await this._contract['getNews']();
    return contractNewsList.map((contractNews) => DfnContractAdapterService.mapToNewsModel(contractNews));
  }
}
