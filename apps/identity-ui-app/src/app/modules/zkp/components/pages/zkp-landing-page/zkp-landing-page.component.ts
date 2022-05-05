import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetCurrentUser } from '../../../../shared/store/app.actions';
import { Observable } from 'rxjs';
import { ZkpService } from '../../../services/zkp.service';

@Component({
  selector: 'dfn-identity-zkp-landing-page',
  template: `<dfn-identity-zkp-landing-page-view
    [timelineEvents]="timelineEvents"
    [isLoading]="isLoading$ | async"
  ></dfn-identity-zkp-landing-page-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZkpLandingPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  timelineEvents = [{ status: 'Generate Keys' }, { status: 'Generate Proof' }, { status: 'Prove' }];

  constructor(private store: Store, private zkpService: ZkpService) {}

  ngOnInit(): void {
    this.isLoading$ = this.zkpService.isLoading$;
    this.store.dispatch(GetCurrentUser());
  }
}
