import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-main-landing-page-view',
  templateUrl: `landing-page-view.component.html`,
  styleUrls: ['landing-page-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageViewComponent {}
