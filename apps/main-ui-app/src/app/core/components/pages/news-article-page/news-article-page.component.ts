import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsInitialized } from '../../../store/app.reducers';

@Component({
  selector: 'dfn-main-news-article-page',
  template: ` <div class="news-article-page-container">
    <div class="news-article-container">
      <ng-container *ngIf="isInitialized$ | async; else notInitialized">
        <dfn-main-news-article-container></dfn-main-news-article-container>
      </ng-container>
      <ng-template #notInitialized>
        <dfn-main-no-access-content-view></dfn-main-no-access-content-view>
      </ng-template>
    </div>
  </div>`,
  styleUrls: ['news-article-page.component.scss'],
})
export class NewsArticlePageComponent implements OnInit {
  isInitialized$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isInitialized$ = this.store.select(selectIsInitialized());
  }
}
