import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsInitialized } from '../../../store/app.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'dfn-main-news-feed-page',
  template: `
    <div class="news-feed-page-container">
      <div class="news-feed-container">
        <ng-container *ngIf="isInitialized$ | async; else notInitialized">
          <dfn-main-news-feed-container></dfn-main-news-feed-container>
        </ng-container>
        <ng-template #notInitialized>
          <dfn-main-no-access-content-view></dfn-main-no-access-content-view>
        </ng-template>
      </div>
      <div class="account-and-filters-container">
        <dfn-main-account-management-container></dfn-main-account-management-container>
      </div>
    </div>
  `,
  styleUrls: ['news-feed-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedPageComponent implements OnInit {
  isInitialized$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isInitialized$ = this.store.select(selectIsInitialized());
  }
}
