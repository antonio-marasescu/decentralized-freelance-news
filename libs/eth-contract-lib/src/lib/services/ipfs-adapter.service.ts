import { Inject, Injectable, Optional } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { IpfsToken } from '../types/ipfs.types';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { AddResult } from 'ipfs-http-client/add-all';

@Injectable({ providedIn: 'root' })
export class IpfsAdapterService {
  constructor(@Inject(IpfsToken) @Optional() private ipfs?: IPFSHTTPClient) {}

  public addFile(file: File): Observable<string> {
    const data = {
      path: file.name,
      content: file,
    };
    return from(this.ipfs.add(data)).pipe(map((res: AddResult) => res.cid.toString()));
  }

  getFile(hash: string): Observable<Blob> {
    return from(this.downloadFile(hash));
  }

  private async downloadFile(hash: string): Promise<Blob> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of this.ipfs.cat(hash)) {
      chunks.push(chunk);
    }
    return new Blob(chunks);
  }
}
