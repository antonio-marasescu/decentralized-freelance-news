import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentAccount } from '../../store/app.reducers';
import { Observable } from 'rxjs';
import { RequestAccountsAccess } from '../../store/app.actions';

@Component({
  selector: 'dfn-main-account-management-container',
  template: `
    <dfn-main-account-management-view
      [account]="account$ | async"
      (connect)="onConnect()"
    ></dfn-main-account-management-view>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountManagementContainerComponent implements OnInit {
  account$: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.account$ = this.store.select(selectCurrentAccount());
  }

  onConnect(): void {
    this.store.dispatch(RequestAccountsAccess());
  }
}
