import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-identity-landing-page-view',
  templateUrl: `landing-page-view.component.html`,
  styleUrls: ['landing-page-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageViewComponent {}
