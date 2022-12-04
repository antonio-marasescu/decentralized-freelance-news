import { Injectable } from '@angular/core';
import { IdentityStorageClass } from '../types/identity-storage-class.types';
import { isNil } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class IdentityVerificationService {
  private readonly _storageClassKey = 'storage-class';
  private readonly _storedIdentityKey = 'stored-identity';
  private _storedIdentity: string | null = null;

  get storageClass(): IdentityStorageClass {
    const storageClass = IdentityStorageClass[localStorage.getItem(this._storageClassKey)];
    return isNil(storageClass) ? IdentityStorageClass.InMemory : storageClass;
  }

  set storageClass(value: IdentityStorageClass) {
    const oldStoredIdentity = this.storedIdentity;
    localStorage.setItem(this._storageClassKey, value);
    if (!isNil(oldStoredIdentity)) {
      this.storedIdentity = oldStoredIdentity;
    }
  }

  get storedIdentity(): string | null {
    switch (this.storageClass) {
      case IdentityStorageClass.LocalStorage:
        return localStorage.getItem(this._storedIdentityKey);
      case IdentityStorageClass.SessionStorage:
        return sessionStorage.getItem(this._storedIdentityKey);
      default:
        return this._storedIdentity;
    }
  }

  set storedIdentity(value: string) {
    this.clearStorage();
    switch (this.storageClass) {
      case IdentityStorageClass.LocalStorage:
        localStorage.setItem(this._storedIdentityKey, value);
        break;
      case IdentityStorageClass.SessionStorage:
        sessionStorage.setItem(this._storedIdentityKey, value);
        break;
      default:
        this._storedIdentity = value;
    }
  }

  private clearStorage(): void {
    this._storedIdentity = null;
    localStorage.removeItem(this._storedIdentityKey);
    sessionStorage.removeItem(this._storedIdentityKey);
  }
}
