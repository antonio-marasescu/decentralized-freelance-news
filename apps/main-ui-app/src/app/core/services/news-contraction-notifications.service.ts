import { Injectable } from '@angular/core';
import { DfnContractAdapterService } from '@decentralized-freelance-news/eth-contract-lib';
import { filter, Observable, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsInitialized, selectNewsMap } from '../store/app.reducers';
import { map } from 'rxjs/operators';
import { AddNewsArticle } from '../store/app.actions';
import { isNil } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class NewsContractionNotificationsService {
  constructor(private dfnContractAdapterService: DfnContractAdapterService, private store: Store) {}

  setup(): Observable<unknown> {
    return this.dfnContractAdapterService.newsAddedEvent.asObservable().pipe(
      withLatestFrom(this.store.select(selectIsInitialized())),
      filter(([, isInitialized]) => isInitialized),
      map(([articleId]) => articleId),
      withLatestFrom(this.store.select(selectNewsMap())),
      tap(([articleId, articlesMap]) => {
        if (!isNil(articlesMap[articleId])) {
          // ignore articles which are already in the data store
          return;
        }
        this.store.dispatch(AddNewsArticle({ articleId }));
      })
    );
  }
}
