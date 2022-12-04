import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentAccount, selectStoredIdentity } from '../../store/app.reducers';
import { Observable, tap } from 'rxjs';
import { RequestAccountsAccess } from '../../store/app.actions';
import { map } from 'rxjs/operators';
import { isNil } from 'lodash-es';

@Component({
  selector: 'dfn-main-account-management-container',
  template: `
    <ng-container *ngIf="account$ && hasIdentityStored$">
      <dfn-main-account-management-view
        [account]="account$ | async"
        [hasIdentity]="hasIdentityStored$ | async"
        (connect)="onConnect()"
      ></dfn-main-account-management-view>
    </ng-container>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountManagementContainerComponent implements OnInit {
  account$: Observable<string>;
  hasIdentityStored$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.account$ = this.store.select(selectCurrentAccount());
    this.hasIdentityStored$ = this.store
      .select(selectStoredIdentity())
      .pipe(map((value) => !isNil(value)));
  }

  onConnect(): void {
    this.store.dispatch(RequestAccountsAccess());
  }
}
