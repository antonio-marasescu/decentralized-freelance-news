import BigNumber from 'bignumber.js';

export enum NewsContentType {
  TextPlain = 'text/plain',
  Markdown = 'application/markdown',
}

export interface INewsContractResponse {
  index: BigNumber;
  ipfsAddress: string;
  newsHash: string;
  title: string;
  summary: string;
  contentType: NewsContentType;
  rating: BigNumber;
  owner: string;
}

export interface INewsModel {
  index: number;
  ipfsAddress: string;
  newsHash: string;
  title: string;
  summary: string;
  contentType: NewsContentType;
  rating: number;
  owner: string;
}

export interface INewsModelCreateDto {
  ipfsAddress: string;
  newsHash: string;
  title: string;
  summary: string;
  contentType: NewsContentType;
}
