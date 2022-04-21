import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-main-landing-page',
  template: `<dfn-main-landing-page-view></dfn-main-landing-page-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
