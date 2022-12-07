import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';
import { firstValueFrom, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectHasIdentityStored, selectNews } from '../../store/app.reducers';
import { GetNews, IncreaseNewsArticleRating } from '../../store/app.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NewsContractionNotificationsService } from '../../services/news-contraction-notifications.service';
import { AppRoutingService } from '../../services/app-routing.service';
import { isNil } from 'lodash-es';
import { MatDialog } from '@angular/material/dialog';
import { SupportValueModalComponent } from './modals/support-value-modal/support-value-modal.component';

@UntilDestroy()
@Component({
  selector: 'dfn-main-news-feed-container',
  template: `<ng-container *ngIf="items$ && hasIdentityStored$">
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

  constructor(
    private store: Store,
    private newsContractionNotificationsService: NewsContractionNotificationsService,
    private appRoutingService: AppRoutingService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.items$ = this.store.select(selectNews());
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
}
