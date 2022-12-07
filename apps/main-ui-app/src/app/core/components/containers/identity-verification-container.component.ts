import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectHasIdentityStored, selectStorageClass } from '../../store/app.reducers';
import { Observable } from 'rxjs';
import { IdentityStorageClass } from '../../types/identity-storage-class.types';
import { ChangeStorageClass, IdentityVerificationUpload } from '../../store/app.actions';
import { FileUtils } from '@decentralized-freelance-news/shared-lib';

@Component({
  selector: 'dfn-main-identity-verification-container',
  template: `
    <ng-container *ngIf="hasIdentityStored$ && storageClass$">
      <dfn-main-identity-verification-view
        [storageClass]="storageClass$ | async"
        [hasIdentityStored]="hasIdentityStored$ | async"
        (storageClassChange)="onStorageClassChange($event)"
        (identityUpload)="onIdentityUpload($event)"
      ></dfn-main-identity-verification-view>
    </ng-container>
    this.hasIdentityStored$ = this.store.select(selectStoredIdentity()).pipe( tap(console.log),
    map((value) => !isNil(value)) );
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityVerificationContainerComponent implements OnInit {
  storageClass$: Observable<IdentityStorageClass>;
  hasIdentityStored$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.storageClass$ = this.store.select(selectStorageClass());
    this.hasIdentityStored$ = this.store.select(selectHasIdentityStored());
  }

  onStorageClassChange(newStorageClass: IdentityStorageClass): void {
    this.store.dispatch(ChangeStorageClass({ newStorageClass }));
  }

  async onIdentityUpload(event: Event): Promise<void> {
    const element = event.currentTarget as HTMLInputElement;
    const uploadedFile = element.files?.[0];
    if (!uploadedFile) {
      return;
    }
    const newStoredIdentity = await FileUtils.readFileContentAsText(uploadedFile);
    this.store.dispatch(IdentityVerificationUpload({ newStoredIdentity }));
  }
}
