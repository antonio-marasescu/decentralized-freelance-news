import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetCurrentAccount, SetupEthereumServices } from './core/store/app.actions';
import { Observable } from 'rxjs';
import { selectIsLoading } from './core/store/app.reducers';

@Component({
  selector: 'dfn-main-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.loading$ = this.store.select(selectIsLoading());
    this.store.dispatch(GetCurrentAccount());
    this.store.dispatch(SetupEthereumServices());
  }
}
