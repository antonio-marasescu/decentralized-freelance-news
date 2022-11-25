import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-main-navigation-container',
  template: `<dfn-main-navigation-view><ng-content></ng-content></dfn-main-navigation-view>`,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContainerComponent {}
