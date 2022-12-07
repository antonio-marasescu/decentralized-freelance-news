import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INewsModel } from '@decentralized-freelance-news/eth-contract-lib';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectNews } from '../../store/app.reducers';
import { GetNews } from '../../store/app.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NewsContractionNotificationsService } from '../../services/news-contraction-notifications.service';
import { AppRoutingService } from '../../services/app-routing.service';

@UntilDestroy()
@Component({
  selector: 'dfn-main-news-feed-container',
  template: `<ng-container *ngIf="items$">
    <dfn-main-news-feed-view
      [newsFeedList]="items$ | async"
      (readEvent)="onRead($event)"
    ></dfn-main-news-feed-view>
  </ng-container>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsFeedContainerComponent implements OnInit {
  items$: Observable<INewsModel[]>;

  constructor(
    private store: Store,
    private newsContractionNotificationsService: NewsContractionNotificationsService,
    private appRoutingService: AppRoutingService
  ) {}

  ngOnInit(): void {
    this.items$ = this.store.select(selectNews());
    this.store.dispatch(GetNews());
    this.newsContractionNotificationsService.setup().pipe(untilDestroyed(this)).subscribe();
  }

  async onRead(id: number): Promise<void> {
    await this.appRoutingService.navigateToNewsArticlePage(id);
  }
}
