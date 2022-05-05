import { HttpHeaders } from '@angular/common/http';

export const httpOptionsText = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain',
  }),
};

export const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export const httpOptionsFormUrlEncoded = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};

export const API_VERSION = 1;
export const API_URL = `api/v${API_VERSION}`;
