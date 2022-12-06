import { InjectionToken } from '@angular/core';
import { IPFSHTTPClient } from 'ipfs-http-client';

export const IpfsToken = new InjectionToken<IPFSHTTPClient>('IpfsHttpClient');
