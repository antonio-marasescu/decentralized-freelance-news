import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dfn-identity-zkp-main-page-view',
  templateUrl: `zkp-landing-page-view.component.html`,
  styleUrls: ['zkp-landing-page-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZkpLandingPageViewComponent {
  @Input() isLoading = false;
  @Input() timelineEvents: Array<{ status: string }>;
}
