import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, from, Observable, switchMap } from 'rxjs';
import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';
import {
  selectCurrentNewsArticle,
  selectCurrentNewsArticleContent,
} from '../../store/app.reducers';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GetNewsArticleById } from '../../store/app.actions';
import { isNil } from 'lodash-es';

@UntilDestroy()
@Component({
  selector: 'dfn-main-news-article-container',
  template: `
    <ng-container *ngIf="currentNewsArticle$ && currentNewsArticleContent$">
      <dfn-main-news-article-view
        [article]="currentNewsArticle$ | async"
        [content]="currentNewsArticleContent$ | async"
      ></dfn-main-news-article-view>
    </ng-container>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsArticleContainerComponent implements OnInit {
  currentNewsArticle$: Observable<INewsModel>;
  currentNewsArticleContent$: Observable<string>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentNewsArticle$ = this.store
      .select(selectCurrentNewsArticle())
      .pipe(filter((value) => !isNil(value)));
    this.currentNewsArticleContent$ = this.store.select(selectCurrentNewsArticleContent()).pipe(
      filter((value) => !isNil(value)),
      switchMap((file: Blob) => from(file.text()))
    );
    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.getNewsArticle(params['id']);
    });
  }

  private getNewsArticle(stringId: string): void {
    const id = parseInt(stringId, 10);
    if (!isNil(id)) {
      this.store.dispatch(GetNewsArticleById({ id }));
    }
  }
}
