import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { API_URL, httpOptionsJson, httpOptionsText } from '../../shared/configuration/http.config';
import { IZkpCreateDto, IZkpKeysDto, IZkpProofDto } from '@decentralized-freelance-news/api-shared-lib';

@Injectable({ providedIn: 'root' })
export class ZkpService {
  private _isLoading = false;
  readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoading(): boolean {
    return this._isLoading;
  }

  private set isLoading(value: boolean) {
    if (value !== this._isLoading) {
      this._isLoading = value;
      this.isLoading$.next(this._isLoading);
    }
  }

  constructor(private httpClient: HttpClient) {}

  generateKeys(): Observable<IZkpKeysDto> {
    this.isLoading = true;
    return this.httpClient
      .get<IZkpKeysDto>(`${API_URL}/zkp/keys`, httpOptionsJson)
      .pipe(finalize(() => (this.isLoading = false)));
  }

  generateProof(payload: IZkpCreateDto): Observable<IZkpProofDto> {
    return this.httpClient
      .post<IZkpProofDto>(`${API_URL}/zkp/proof`, payload, httpOptionsJson)
      .pipe(finalize(() => (this.isLoading = false)));
  }

  generateContract(): Observable<string> {
    return this.httpClient
      .get(`${API_URL}/zkp/contract`, { ...httpOptionsText, responseType: 'text' })
      .pipe(finalize(() => (this.isLoading = false)));
  }
}
