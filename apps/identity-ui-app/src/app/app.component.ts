import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ZkpService } from './core/services/zkp.service';
import { combineLatest, map, Observable } from 'rxjs';
import { selectIsLoading } from './core/store/app.reducers';

@Component({
  selector: 'dfn-identity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;
  constructor(private store: Store, private zkpService: ZkpService) {}

  ngOnInit(): void {
    this.isLoading$ = combineLatest([
      this.store.select(selectIsLoading()),
      this.zkpService.isLoading$,
    ]).pipe(map(([a, b]) => a || b));
  }
}
