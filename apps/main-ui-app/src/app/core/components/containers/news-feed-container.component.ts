import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';
import { BehaviorSubject, combineLatest, debounceTime, firstValueFrom, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectHasIdentityStored, selectNews } from '../../store/app.reducers';
import { GetNews, IncreaseNewsArticleRating } from '../../store/app.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NewsContractionNotificationsService } from '../../services/news-contraction-notifications.service';
import { AppRoutingService } from '../../services/app-routing.service';
import { isNil } from 'lodash-es';
import { MatDialog } from '@angular/material/dialog';
import { SupportValueModalComponent } from './modals/support-value-modal/support-value-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FilterDebounceTime, NewsFilterForm, NewsSortOption } from '../../types/news-filter.types';
import { Comparer } from '@ngrx/entity/src/models';
import { NewsArticleSortUtils } from '../../utils/news-article-sort.utils';

@UntilDestroy()
@Component({
  selector: 'dfn-main-news-feed-container',
  template: `<ng-container *ngIf="items$ && hasIdentityStored$ && form">
    <dfn-main-news-feed-filter-view
      [form]="form"
      (changeSort)="onChangeSort($event)"
    ></dfn-main-news-feed-filter-view>
    <dfn-main-news-feed-view
      [newsFeedList]="items$ | async"
      [hasIdentity]="hasIdentityStored$ | async"
      (likeEvent)="onLike($event)"
      (readEvent)="onRead($event)"
    ></dfn-main-news-feed-view>
  </ng-container>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedContainerComponent implements OnInit {
  items$: Observable<INewsModel[]>;
  hasIdentityStored$: Observable<boolean>;
  form: FormGroup;
  private initialForm: NewsFilterForm = {
    ascendedSort: false,
    search: '',
    sortType: NewsSortOption.Date,
  };
  filter$ = new BehaviorSubject<NewsFilterForm>(this.initialForm);

  constructor(
    private store: Store,
    private newsContractionNotificationsService: NewsContractionNotificationsService,
    private appRoutingService: AppRoutingService,
    private matDialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      ascendedSort: new FormControl(this.initialForm.ascendedSort, []),
      search: new FormControl(this.initialForm.search, []),
      sortType: new FormControl(this.initialForm.sortType, []),
    });
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.filter$.next(value));
    this.items$ = combineLatest([
      this.store.select(selectNews()),
      this.filter$.asObservable().pipe(debounceTime(FilterDebounceTime)),
    ]).pipe(
      map(([news, formValue]) => {
        if (isNil(formValue)) {
          return news;
        }
        const sortQuery = this.getSortFilter(formValue);
        return news
          .filter((article) => article.title.toLowerCase().includes(formValue.search.toLowerCase()))
          .sort(sortQuery);
      })
    );
    this.hasIdentityStored$ = this.store.select(selectHasIdentityStored());
    this.newsContractionNotificationsService.setup().pipe(untilDestroyed(this)).subscribe();
    this.store.dispatch(GetNews());
  }

  async onLike(articleId: number): Promise<void> {
    const dialogRef = this.matDialog.open(SupportValueModalComponent, {
      height: '250px',
      width: '400px',
      autoFocus: false,
    });
    const dialogResult = await firstValueFrom(dialogRef.afterClosed());
    if (isNil(dialogResult)) {
      return;
    }
    this.store.dispatch(IncreaseNewsArticleRating({ articleId, amount: dialogResult }));
  }

  async onRead(articleId: number): Promise<void> {
    await this.appRoutingService.navigateToNewsArticlePage(articleId);
  }

  async onChangeSort(ascendedSort: boolean): Promise<void> {
    this.form.patchValue({ ascendedSort });
    this.changeDetectorRef.detectChanges();
  }

  private getSortFilter(formValue: NewsFilterForm): Comparer<INewsModel> {
    if (formValue.sortType === NewsSortOption.Rating) {
      return formValue.ascendedSort
        ? NewsArticleSortUtils.sortAscendingByRatingCompareFn
        : NewsArticleSortUtils.sortDescendingByRatingCompareFn;
    } else {
      return formValue.ascendedSort
        ? NewsArticleSortUtils.sortAscendingByDateCompareFn
        : NewsArticleSortUtils.sortDescendingByDateCompareFn;
    }
  }
}
