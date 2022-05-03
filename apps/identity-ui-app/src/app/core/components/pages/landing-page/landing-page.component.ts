import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-identity-landing-page',
  template: `<dfn-identity-landing-page-view></dfn-identity-landing-page-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
