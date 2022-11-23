import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentAccount } from '../../../store/app.reducers';

@Component({
  selector: 'dfn-main-navigation-container',
  template: `<dfn-main-navigation-view
    [items]="items"
    [currentAccount]="currentAccount$ | async"
  ></dfn-main-navigation-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContainerComponent implements OnInit {
  items: MenuItem[] = [{ label: 'Decentralized Freelance News', icon: 'pi pi-qrcode' }];
  currentAccount$: Observable<string>;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.currentAccount$ = this.store.select(selectCurrentAccount());
  }
}
