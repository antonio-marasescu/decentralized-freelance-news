import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetCurrentUser } from '../../../store/app.actions';

@Component({
  selector: 'dfn-identity-landing-page',
  template: `<dfn-identity-landing-page-view></dfn-identity-landing-page-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(GetCurrentUser());
  }
}
