import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-identity-login-page',
  template: `<dfn-identity-login-page-view></dfn-identity-login-page-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
