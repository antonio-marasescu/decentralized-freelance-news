import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, httpOptionsFormUrlEncoded, httpOptionsJson } from '../../modules/shared/configuration/http.config';
import {
  IdentityUserDto,
  IIdentityUserAccessTokenDto,
  IIdentityUserLoginDto,
  IIdentityUserRegisterDto,
} from '@decentralized-freelance-news/api-shared-lib';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(payload: IIdentityUserLoginDto): Observable<IIdentityUserAccessTokenDto> {
    const body = new HttpParams().set('username', payload.username).set('password', payload.password);
    return this.httpClient.post<IIdentityUserAccessTokenDto>(`${API_URL}/auth/login`, body, httpOptionsFormUrlEncoded);
  }

  register(payload: IIdentityUserRegisterDto): Observable<IdentityUserDto> {
    return this.httpClient.post<IdentityUserDto>(`${API_URL}/auth/register`, { ...payload }, httpOptionsJson);
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>(`/logout`, httpOptionsJson);
  }

  getUserById(id: string): Observable<IdentityUserDto> {
    return this.httpClient.get<IdentityUserDto>(`${API_URL}/auth/users/${id}`, httpOptionsJson);
  }

  getUserByUsername(username: string): Observable<IdentityUserDto> {
    return this.httpClient.get<IdentityUserDto>(`${API_URL}/auth/users/username/${username}`, httpOptionsJson);
  }
}
