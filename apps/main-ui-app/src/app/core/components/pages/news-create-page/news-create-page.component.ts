import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsInitialized } from '../../../store/app.reducers';

@Component({
  selector: 'dfn-main-news-create-page',
  template: ` <div class="news-create-page-container">
    <div class="news-create-container">
      <ng-container *ngIf="isInitialized$ | async; else notInitialized">
        <dfn-main-create-article-container></dfn-main-create-article-container>
      </ng-container>
      <ng-template #notInitialized>
        <dfn-main-no-access-content-view></dfn-main-no-access-content-view>
      </ng-template>
    </div>
    <div class="account-and-filters-container">
      <dfn-main-account-management-container></dfn-main-account-management-container>
    </div>
  </div>`,
  styleUrls: ['news-create-page.component.scss'],
})
export class NewsCreatePageComponent implements OnInit {
  isInitialized$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isInitialized$ = this.store.select(selectIsInitialized());
  }
}
