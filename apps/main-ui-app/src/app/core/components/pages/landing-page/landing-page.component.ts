import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { selectIsInitialized } from '../../../store/app.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'dfn-main-landing-page',
  template: `<dfn-main-news-list-container *ngIf="isInitialized$ | async"></dfn-main-news-list-container>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  isInitialized$: Observable<boolean>;

  constructor(private store: Store) {}
  ngOnInit() {
    this.isInitialized$ = this.store.select(selectIsInitialized());
  }
}
