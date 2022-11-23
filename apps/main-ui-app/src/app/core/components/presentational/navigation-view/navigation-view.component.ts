import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'dfn-main-navigation-view',
  templateUrl: 'navigation-view.component.html',
  styleUrls: ['navigation-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationViewComponent {
  @Input() items: MenuItem[];
  @Input() currentAccount: string;
}
