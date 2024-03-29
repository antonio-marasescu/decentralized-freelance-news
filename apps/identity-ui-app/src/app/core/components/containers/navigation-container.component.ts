import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../store/app.reducers';
import { Observable } from 'rxjs';
import { IIdentityUserDto } from '@decentralized-freelance-news/api-shared-lib';
import { Logout } from '../../store/app.actions';

@Component({
  selector: 'dfn-identity-navigation-container',
  template: `<dfn-identity-navigation-view
    [currentUser]="currentUser$ | async"
    (logout)="onLogout()"
  ></dfn-identity-navigation-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContainerComponent implements OnInit {
  currentUser$: Observable<IIdentityUserDto>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(selectCurrentUser());
  }

  onLogout(): void {
    this.store.dispatch(Logout());
  }
}
