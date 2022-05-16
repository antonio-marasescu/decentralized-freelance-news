import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dfn-main-navigation-view',
  templateUrl: 'navigation-view.component.html',
  styleUrls: ['navigation-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationViewComponent {}
