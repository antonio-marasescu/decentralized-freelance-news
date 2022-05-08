export interface INewsModel {
  index: number;
  ipfsAddress: string;
  newsHash: string;
  title: string;
  summary: string;
  owner: string;
}

export interface INewsModelCreateDto {
  ipfsAddress: string;
  newsHash: string;
  title: string;
  summary: string;
}
